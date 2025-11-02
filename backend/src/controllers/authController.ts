// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario';

const AUTH_TOKEN = process.env.AUTH_TOKEN || 'mentagranizada'; 

// Registrar nuevo usuario
export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password)
      return res.status(400).json({ error: 'Faltan campos requeridos' });

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente)
      return res.status(400).json({ error: 'El email ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
    });

    // Generamos el token JWT con la misma estructura que espera `requireAuth`
    const token = jwt.sign(
      { id: nuevoUsuario.id, email: nuevoUsuario.email },
      AUTH_TOKEN,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login de usuario
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Faltan campos requeridos' });

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario)
      return res.status(404).json({ error: 'Usuario no encontrado' });

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido)
      return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      AUTH_TOKEN,
      { expiresIn: '1h' }
    );

    return res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
