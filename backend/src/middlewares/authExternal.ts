import { Request, Response, NextFunction } from 'express';

export const authExternal = (req: Request, res: Response, next: NextFunction) => {
  // Token de autorización que recibirán los clientes externos
  const token = req.headers['x-api-key'] as string;

  if (!token || token !== process.env.API_KEY) {
    return res.status(401).json({ mensaje: 'No autorizado' });
  }

  next();
};
