import express from 'express';
import { crearProducto, obtenerProductos } from '../controllers/productController';
import { authCombined } from '../middlewares/authCombined';
import { authenticateToken } from '../middlewares/authJwt';

const router = express.Router();

router.post('/', authenticateToken, authCombined, crearProducto);
router.get('/', authenticateToken, authCombined, obtenerProductos);

export default router;
