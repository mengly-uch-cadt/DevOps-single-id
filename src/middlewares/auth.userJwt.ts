import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateUserJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ error: 'Missing token' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    if (!payload.sub || typeof payload.sub !== 'string') {
      res.status(401).json({ error: 'Invalid token payload' });
      return;
    }
    req.sidUser = { global_id: payload.sub, tokenPayload: payload };
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
