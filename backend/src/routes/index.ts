import express, { Request, Response } from 'express';
import authRoutes from './authRoutes';
import productsRoutes from './productsRoutes';

const router = express.Router();

// Ruta raíz
router.get('/', (_req: Request, res: Response) => {
  res.json({ mensaje: 'API funcionando 🚀' });
});

// Ruta de usuarios
router.use('/auth', authRoutes);

// Rutas de productos
router.use('/productos', productsRoutes);


// Ruta de prueba
router.get('/ping', (_req: Request, res: Response) => {
  console.log('ROUTES: Algo a picado aqui!!');
  res.send('pong pong');
});

export default router;
