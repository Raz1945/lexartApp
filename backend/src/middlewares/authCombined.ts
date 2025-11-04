import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: { id: number; nombre: string; email: string };
}

export const authCombined = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Si el usuario está logueado, pasamos
  if (req.user) return next();

  // Sino validamos token externo
  const token = req.headers['x-api-key'] as string;
  if (!token || token !== process.env.API_KEY) {
    return res.status(401).json({ mensaje: 'No autorizado' });
  }

  // Marcamos un "usuario externo" ficticio para el controller
  req.user = { id: 1, nombre: 'Usuario Externo', email: 'externo@app.com' };

  next();
};
