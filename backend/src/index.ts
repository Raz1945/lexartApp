import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';
import { connectDB } from './db/connection';

dotenv.config(); // Cargar las variables de entorno antes de inicializar la app


// ====================================================
// Inicialización de la aplicación Express
// ====================================================
const app = express();


// ====================================================
// Configuración de CORS
// ====================================================
// Se define una lista blanca de dominios permitidos.
// Si el origen no está en la lista, la solicitud será rechazada.
const allowedOrigins = [
  "http://localhost:5173",
  "https://lexart-app.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      if (origin?.includes(".vercel.app")) return callback(null, true);
      return callback(new Error(`CORS no permitido para: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    credentials: true,
  })
);


// ====================================================
// Middlewares globales
// ====================================================
app.use(express.json());
app.use("/", routes);


// ====================================================
// Conexión a la base de datos
// ====================================================
// Se ejecuta una única vez al iniciar el servidor.
// Usa la instancia de Sequelize configurada en models/index.ts.
(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("❌ Error al conectar la base de datos:", error);
  }
})();


// ====================================================
// Manejo de errores
// ====================================================
// Captura errores internos del servidor.
// Si el entorno es 'development', muestra el mensaje real del error.
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development" ? err.message : "Algo salió mal",
  });
});

// Middleware para rutas no encontradas (404)
app.use((_, res) => res.status(404).json({ error: "Route not found" }));


// ====================================================
// Servidor local (solo en desarrollo)
// ====================================================
// Si el entorno no es producción, se inicia el servidor local.
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`⚡ Servidor local en http://localhost:${PORT}`);
  });
}


// Se exporta la instancia de Express (útil para testing o despliegue en Vercel).
export default app;
