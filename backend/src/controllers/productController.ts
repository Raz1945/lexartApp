import { Request, Response } from 'express';
import { Producto, Variante } from '../models';

interface AuthRequest extends Request {
  user?: { id: number; nombre: string; email: string };
}

// Función auxiliar para crear un producto con sus variantes
const crearProductoConVariantes = async (
  name: string,
  brand: string,
  model: string,
  usuarioId: number,
  variantes: { color: string; price: number }[]
) => {
  const producto = await Producto.create({ name, brand, model, usuarioId });

  for (const v of variantes) {
    await Variante.create({
      color: v.color,
      price: v.price,
      productoId: producto.id,
    });
  }

  return producto;
};


// Crear productos (usuarios logueados o externos)
export const crearProducto = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ mensaje: 'No autorizado' });
    }

    const usuarioId = req.user.id;
    const data = req.body;
    const creados: Producto[] = [];

    // ESTRUCTURA 1
    if (data.name && data.brand && data.model && data.price && data.color) {
      const producto = await crearProductoConVariantes(
        data.name,
        data.brand,
        data.model,
        usuarioId,
        [{ color: data.color, price: data.price }]
      );
      creados.push(producto);
    }

    // ESTRUCTURA 2
    else if (data.name && data.details && data.price) {
      const producto = await crearProductoConVariantes(
        data.name,
        data.details.brand,
        data.details.model,
        usuarioId,
        [{ color: data.details.color, price: data.price }]
      );
      creados.push(producto);
    }

    // ESTRUCTURA 3
    else if (Array.isArray(data)) {
      for (const item of data) {
        const variantes = item.data.map((v: any) => ({ color: v.color, price: v.price }));
        const producto = await crearProductoConVariantes(
          item.name,
          item.brand,
          item.model,
          usuarioId,
          variantes
        );
        creados.push(producto);
      }
    } else {
      return res.status(400).json({ mensaje: 'Estructura de producto no válida' });
    }

    return res.status(201).json({ mensaje: 'Productos creados', productos: creados });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener todos los productos (para usuarios logueados o externos)
export const obtenerProductos = async (_req: Request, res: Response) => {
  try {
    const productos = await Producto.findAll({
      include: [{ model: Variante, as: 'variantes' }],
    });
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener productos de un usuario logueado
export const obtenerProductosDelUsuario = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ mensaje: 'No autenticado' });

    const productos = await Producto.findAll({
      where: { usuarioId: req.user.id },
      include: [{ model: Variante, as: 'variantes' }],
    });
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos del usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar producto (solo si pertenece al usuario)
export const actualizarProducto = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    if (producto.usuarioId !== req.user?.id) return res.status(403).json({ mensaje: 'No autorizado' });

    await producto.update(req.body);
    res.json({ mensaje: 'Producto actualizado', producto });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar producto (solo si pertenece al usuario)
export const eliminarProducto = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    if (producto.usuarioId !== req.user?.id) return res.status(403).json({ mensaje: 'No autorizado' });

    await Variante.destroy({ where: { productoId: id } });
    await producto.destroy();

    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
