import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models';
import routes from './routes/index';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Rutas
app.use('/', routes);

// Probar conexión antes de iniciar el servidor
sequelize.authenticate()
  .then(() => {
    console.log('--- Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`--- Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('--- Error al conectar la base de datos:', err);
  });
