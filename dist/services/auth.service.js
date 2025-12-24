"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const base_service_1 = require("./base.service");
class AuthService extends base_service_1.BaseService {
    async login(user_id, hash) {
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
            const payload = {
                user_id: user.global_id,
                hash: user.hash,
                name: user.name,
            };
            const token = jsonwebtoken_1.default.sign(payload, jwtSecret, {
                expiresIn: `${ttlMinutes}m`,
            });
            return {
                token,
                user: {
                    user_id: user.global_id,
                    name: user.name,
                },
            };
        }
        catch (error) {
            console.error('Error during login:', error);
            return null;
        }
    }
    verifyToken(token) {
        try {
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error('JWT_SECRET not configured');
            }
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map