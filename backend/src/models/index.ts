// Para evitar problemas de dependencias circulares,
// importamos los modelos aquí y luego definimos las relaciones.
import { Usuario } from './usuario';
import { Producto } from './producto';
import { Variante } from './variante';

// ====================================================
// Definición de relaciones entre modelos
// ====================================================
// Un Usuario puede tener varios Productos
Usuario.hasMany(Producto, { foreignKey: 'usuarioId', as: 'productos' });

// Cada Producto pertenece a un único Usuario
Producto.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

// Un Producto puede tener varias Variantes
Producto.hasMany(Variante, { foreignKey: 'productoId', as: 'variantes' });

// Cada Variante pertenece a un único Producto
Variante.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });


// Exportar modelos
export { Usuario, Producto, Variante };