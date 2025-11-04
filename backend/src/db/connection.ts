import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

// ====================================================
// Instancia principal de Sequelize
// ====================================================
// Esta instancia se comparte con todos los modelos.
// Se configura utilizando las variables de entorno del archivo .env
export const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE!,
  process.env.POSTGRES_USER!,
  process.env.POSTGRES_PASSWORD!,
  {
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT!),
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);
//note 
// El ! le indica a TypeScript que sabés que esas variables existen,
// y si faltan, el programa fallará inmediatamente 
// (lo cual es bueno: evita conexiones incompletas).



// ====================================================
// Función para verificar la conexión
// ====================================================
// Solo comprueba que la conexión funcione correctamente.
// No define modelos ni relaciones.
export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(" Conexión con la base de datos verificada correctamente");
  } catch (err) {
    console.error(" Error al conectar con la base de datos:", err);
    throw err;
  }
}
