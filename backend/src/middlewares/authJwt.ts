import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getTokenFromHeader } from './getTokenFromHeader';

dotenv.config();

const AUTH_TOKEN = process.env.AUTH_TOKEN || 'mentagranizada';

// Extendemos el Request de Express para incluir el usuario autenticado
export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    [key: string]: any;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // console.log('🔐 === MIDDLEWARE AUTHENTICATE TOKEN ===');

  const authHeader = req.get('Authorization') || req.headers.authorization || (req.headers as any).Authorization;
  // console.log('📋 Headers:', Object.keys(req.headers));
  // console.log('🔍 Authorization header detectado:', authHeader);

  let token = getTokenFromHeader(authHeader as string);

  if (!token && req.query.token) {
    token = String(req.query.token);
    // console.log('✅ Token encontrado en query string');
  }

  if (!token && req.body?.token) {
    token = req.body.token;
    // console.log('✅ Token encontrado en el body');
  }

  if (!token) {
    // console.log('❌ No se encontró token en ninguna parte');
    res.status(401).json({
      message: 'Token no proporcionado',
      details: 'El token no se encontró en los headers, query o body',
    });
    return;
  }

  // console.log('🎯 Token recibido:', token.substring(0, 20) + '...');

  try {
    const decoded = jwt.verify(token, AUTH_TOKEN) as JwtPayload;

    // console.log('✅ Token válido. Payload:', decoded);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      ...decoded, // por si querés incluir más campos
    };

    next();
  } catch (err: any) {
    console.error('❌ Error verificando token:', err.message);

    if (err.name === 'TokenExpiredError') {
      res.status(403).json({
        message: 'Token expirado',
        error: 'El token ha expirado, por favor inicia sesión nuevamente',
      });
      return;
    }

    if (err.name === 'JsonWebTokenError') {
      res.status(403).json({
        message: 'Token inválido',
        error: 'El formato del token es incorrecto',
      });
      return;
    }

    res.status(403).json({
      message: 'Token inválido o expirado',
      error: err.message,
    });
  }
};
