import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getTokenFromHeader } from "./getTokenFromHeader";

// ====================================================
// Configuración del secreto JWT
// ====================================================
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no definido en variables de entorno");
}


// ====================================================
// Extensión de Request para incluir usuario autenticado
// ====================================================
export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    [key: string]: any;
  };
}


// ====================================================
// Middleware: autenticación mediante JWT
// ====================================================
// Verifica la validez del token JWT en headers, query o body.
// Si el token es válido, agrega los datos del usuario a req.user.
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // Intentar obtener el token desde distintas fuentes
  const authHeader =
    req.get("Authorization") ||
    req.headers.authorization ||
    (req.headers as any).Authorization;

  let token = getTokenFromHeader(authHeader as string);

  if (!token && req.query.token) token = String(req.query.token);
  if (!token && req.body?.token) token = req.body.token;

  // Si no hay token, devolver error
  if (!token) {
    res.status(401).json({
      message: "Token no proporcionado",
      details: "El token no se encontró en los headers, query o body",
    });
    return;
  }

  try {
    // Verificar token con la clave secreta
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Agregar los datos del usuario al objeto req
    req.user = {
      id: decoded.id,
      email: decoded.email,
      ...decoded,
    };

    // Continuar al siguiente middleware o controlador
    next();
  } catch (err: any) {
    console.error("Error verificando token:", err.message);

    // Manejo de errores específicos de JWT
    if (err.name === "TokenExpiredError") {
      res.status(401).json({
        message: "Token expirado",
        error: "El token ha expirado, por favor inicia sesión nuevamente",
      });
      return;
    }

    if (err.name === "JsonWebTokenError") {
      res.status(401).json({
        message: "Token inválido",
        error: "El formato del token es incorrecto",
      });
      return;
    }

    // Cualquier otro error
    res.status(401).json({
      message: "Token inválido o expirado",
      error: err.message,
    });

  }
};
