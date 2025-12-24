import jwt from 'jsonwebtoken';
import { BaseService } from './base.service';

export interface DecodedExternalToken {
  user_id: string;
  hash: string;
  [key: string]: any;
}

export interface JWTPayload {
  user_id: string;
  hash: string;
  name: string;
}

export class AuthService extends BaseService {
  async login(user_id: string, hash: string): Promise<{ token: string; user: any } | null> {
    try {
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error('JWT_SECRET not configured');
      }

      // Debug: Log the incoming credentials
      console.log('Login attempt:', { user_id, hash });

      // Find user by user_id (global_id in DB) and hash
      const user = await this.prisma.users.findFirst({
        where: {
          global_id: user_id,
          hash,
        },
      });

      console.log('User found:', user ? 'Yes' : 'No');

      if (!user) {
        return null;
      }

      // Get JWT TTL from settings
      const jwtTtlSetting = await this.prisma.settings.findFirst({
        where: {
          slug: 'jwt_ttl',
          key: 'jwt_ttl',
        },
      });

      const ttlMinutes = jwtTtlSetting ? parseInt(jwtTtlSetting.value) : 1440; // Default 24 hours

      // Generate JWT token with user_id
      const payload: JWTPayload = {
        user_id: user.global_id,
        hash: user.hash,
        name: user.name,
      };

      const token = jwt.sign(payload, jwtSecret, {
        expiresIn: `${ttlMinutes}m`,
      });

      return {
        token,
        user: {
          user_id: user.global_id,
          name: user.name,
        },
      };
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error('JWT_SECRET not configured');
      }

      const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}

export const authService = new AuthService();
