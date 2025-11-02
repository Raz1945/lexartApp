import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models";
import routes from "./routes/index";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// CORS dinámico
const allowedOrigins = [
  "http://localhost:5173",          // frontend local
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // permite Postman, scripts, etc.
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS no permitido para el origen: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/", routes);

// Conexión a Neon (Postgres serverless)
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos Neon");
    console.log("Host:", (sequelize as any).config.host);
    console.log("Base de datos:", (sequelize as any).config.database);

    // Sincroniza solo en desarrollo (opcional)
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
      console.log("Tablas sincronizadas (modo desarrollo)");
    }

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con Neon:", error);
  }
}

startServer();

export default app; 
