import { Request, Response, NextFunction } from 'express';
import { accessesService } from '../services/accesses.service';
import { sendError } from '../utils/response';

/**
 * Basic Auth middleware that validates access using allow_endpoint (username) and token (password)
 * from the accesses table
 */
export const authenticateBasicAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      sendError(res, 'Missing or invalid Authorization header', 401);
      return;
    }

    // Decode Base64 credentials
    const base64Credentials = authHeader.substring(6); // Remove 'Basic ' prefix
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [allow_endpoint, token] = credentials.split(':');

    if (!allow_endpoint || !token) {
      sendError(res, 'Invalid credentials format', 401);
      return;
    }

    // Validate credentials against accesses table
    const isValid = await accessesService.validateBasicAuth(allow_endpoint, token);

    if (!isValid) {
      sendError(res, 'Invalid credentials', 401);
      return;
    }

    // Attach access info to request for later use
    req.accessInfo = {
      allow_endpoint,
    };

    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Authentication failed';
    sendError(res, message, 500);
  }
};
