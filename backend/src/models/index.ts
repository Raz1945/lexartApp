import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Detectar entorno
const NODE_ENV = process.env.NODE_ENV || 'development';

// Seleccionar la URL según el entorno
let DB_URL: string | undefined;

if (NODE_ENV === 'production') {
  DB_URL = process.env.DATABASE_URL;        // Neon o AWS en Vercel
} else if (NODE_ENV === 'aws') {
  DB_URL = process.env.DATABASE_URL_AWS;    // AWS RDS
} else {
  DB_URL = process.env.DATABASE_URL_LOCAL;  // Local
}

if (!DB_URL) throw new Error('No se encontró la URL de base de datos apropiada.');

// Conexión a la base de datos
export const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  logging: NODE_ENV === 'development', // activa logs solo en local
  dialectOptions: {
    ssl: NODE_ENV !== 'development'
      ? { require: true, rejectUnauthorized: false }
      : undefined,
  },
});

// Importar modelos
import { Usuario } from './usuario';
import { Producto } from './producto';
import { Variante } from './variante';

export { Usuario, Producto, Variante };

// Relaciones
Usuario.hasMany(Producto, { foreignKey: 'usuarioId', as: 'productos' });
Producto.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

Producto.hasMany(Variante, { foreignKey: 'productoId', as: 'variantes' });
Variante.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });

// Conectar y sincronizar
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con la base de datos.');

    if (NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Tablas sincronizadas en desarrollo.');
    }

    const [user, created] = await Usuario.findOrCreate({
      where: { id: 1 },
      defaults: {
        nombre: 'Externo',
        email: 'externo@app.com',
        password: 'externo123',
      },
    });

    if (created) console.log('Usuario externo creado.');
  } catch (error) {
    console.error('Error al conectar la base de datos:', error);
  }
};
