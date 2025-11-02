// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import { sequelize } from './models';
// import routes from './routes/index';

// dotenv.config();

// const PORT = process.env.PORT || 3000;
// const app = express();

// // 🧠 Agregamos CORS
// app.use(cors({
//   origin: ['http://localhost:5173'], // Local
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
//   credentials: true,
// }));

// app.use(express.json());

// // Rutas
// app.use('/', routes);

// // Conexión DB
// sequelize.authenticate()
//   .then(() => {
//     console.log('--- Conectado a la base de datos');
//     app.listen(PORT, () => {
//       console.log(`--- Servidor corriendo en puerto ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('--- Error al conectar la base de datos:', err);
//   });


import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models";
import routes from "./routes/index";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// 🌍 Configuración dinámica de CORS
const allowedOrigins = [
  "http://localhost:5173",             // desarrollo local
  "https://lexart-app.vercel.app/",      // dominio Vercel frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin origin (ej. Postman, scripts internos)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS no permitido para el origen: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/", routes);

// Conexión DB
sequelize.authenticate()
  .then(() => {
    console.log("✅ Conectado a la base de datos");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar la base de datos:", err);
  });
