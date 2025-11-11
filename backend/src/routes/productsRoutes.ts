import express from 'express';
import { crearProducto, obtenerProductos } from '../controllers/productController';
import { authenticateToken } from '../middlewares/authJwt';

const router = express.Router();

router.post('/', authenticateToken, crearProducto);
router.get('/', authenticateToken, obtenerProductos);

export default router;
