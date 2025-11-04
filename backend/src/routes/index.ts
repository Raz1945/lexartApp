import express, { Request, Response } from 'express';
import authRoutes from './authRoutes';
import productsRoutes from './productsRoutes';
import { sequelize } from '@db/connection';

const router = express.Router();


// ====================================================
// Ruta raíz
// ====================================================
// Verifica que la API esté respondiendo correctamente.
router.get("/", (_req: Request, res: Response) => {
  res.json({ mensaje: "API funcionando 🚀" });
});


// ====================================================
// Rutas de autenticación
// ====================================================
router.use("/auth", authRoutes);


// ====================================================
// Rutas de productos
// ====================================================
router.use("/productos", productsRoutes);

// ====================================================
// Ruta de health check
// ====================================================
// Comprueba si la base de datos está conectada correctamente.
// Ideal para monitoreo o servicios de uptime.
router.get("/health", async (_req: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: "OK",
      database: "Connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({
      status: "Error",
      database: "Disconnected",
      error: error.message,
    });
  }
});


// ====================================================
// Ruta de estado general (/status)
// ====================================================
// Devuelve información sobre el entorno y la base de datos.
// Útil para debugging o validaciones en despliegue.
router.get("/status", async (_req: Request, res: Response) => {
  try {
    const dbConfig = (sequelize as any)?.config;
    res.json({
      ok: true,
      env: process.env.NODE_ENV,
      database: dbConfig?.database || "No DB config",
      host: dbConfig?.host || "No host",
    });
  } catch (err: any) {
    console.error("🔥 Error en /status:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});


export default router;
