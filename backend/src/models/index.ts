import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// 🔹 Conexión a la base de datos
export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: false,
});

// 🔹 Importar modelos
import { Usuario } from './usuario';
import { Producto } from './producto';
import { Variante } from './variante';

export { Usuario, Producto, Variante };

// 🔹 Definir relaciones
Usuario.hasMany(Producto, { foreignKey: 'usuarioId', as: 'productos' });
Producto.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

Producto.hasMany(Variante, { foreignKey: 'productoId', as: 'variantes' });
Variante.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });

// 🔹 Conectar y sincronizar
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida.');

    // Sincronizamos todos los modelos (crea/actualiza tablas)
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados.');

    // 🔹 Crear usuario externo (id = 1) si no existe
    const [user, created] = await Usuario.findOrCreate({
      where: { id: 1 },
      defaults: {
        nombre: 'Externo',
        email: 'externo@app.com',
        password: 'externo123',
      },
    });

    if (created) console.log('✅ Usuario externo creado');
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:', error);
  }
};
