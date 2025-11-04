import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Configuración
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const BASE_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

let modoExterno = false; // false = usuario logueado, true = API externa

// Obtener headers según modo 
function getHeaders() {
  return modoExterno
    ? { 'x-api-key': API_KEY }
    : { Authorization: `Bearer ${AUTH_TOKEN}` };
}

// FUNCIONES AUXILIARES 
function estructura1() {
  return [
    { name: 'Xiaomi Redmi 9', brand: 'Xiaomi', model: 'Redmi 9', price: 10000, color: 'red' },
    { name: 'Samsung Galaxy A14', brand: 'Samsung', model: 'A14', price: 12000, color: 'black' },
    { name: 'Motorola G32', brand: 'Motorola', model: 'G32', price: 11500, color: 'blue' },
  ];
}

function estructura2() {
  return [
    {
      name: 'Xiaomi Redmi 9',
      details: { brand: 'Xiaomi', model: 'Redmi 9', color: 'red' },
      price: 10000,
    },
    {
      name: 'Samsung Galaxy A14',
      details: { brand: 'Samsung', model: 'A14', color: 'black' },
      price: 12000,
    },
    {
      name: 'Motorola G32',
      details: { brand: 'Motorola', model: 'G32', color: 'blue' },
      price: 11500,
    },
  ];
}

function estructura3() {
  return [
    {
      name: 'Xiaomi Redmi 9',
      brand: 'Xiaomi',
      model: 'Redmi 9',
      data: [
        { price: 10000, color: 'red' },
        { price: 10200, color: 'blue' },
      ],
    },
    {
      name: 'Iphone 14 Pro',
      brand: 'Apple',
      model: '14 Pro',
      data: [
        { price: 30000, color: 'silver' },
        { price: 30500, color: 'gold' },
      ],
    },
    {
      name: 'Motorola Edge 40',
      brand: 'Motorola',
      model: 'Edge 40',
      data: [
        { price: 22000, color: 'gray' },
        { price: 22500, color: 'white' },
      ],
    },
  ];
}

// FUNCIÓN DE CREACIÓN DE PRODUCTO 
async function crearProducto(producto: any, estructura: string) {
  try {
    const res = await axios.post(`${BASE_URL}/productos`, producto, { headers: getHeaders() });
    console.log(`[${modoExterno ? 'API externa' : 'Usuario'}] (${estructura}) → ${res.data?.name || producto.name}`);
  } catch (error: any) {
    if ((error.response?.status === 401 || error.response?.status === 403) && !modoExterno) {
      console.warn('No autorizado como usuario logueado. Cambiando a API externa...');
      modoExterno = true;
      return crearProducto(producto, estructura); // Reintenta con API key
      
    }
  
    console.error(`❌ Error al crear producto (${estructura}):`, producto.name);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

// FUNCIÓN PRINCIPAL 
async function cargarProductos() {
  console.log('Iniciando carga de productos...');
  console.log(`Intentando primero como usuario logueado (JWT)\n`);

  const estructuras = [
    { nombre: 'Estructura 1', data: estructura1() },
    { nombre: 'Estructura 2', data: estructura2() },
    { nombre: 'Estructura 3', data: estructura3() },
  ];

  for (const grupo of estructuras) {
    console.log(`\n Cargando ${grupo.nombre}...`);
    for (const producto of grupo.data) {
      await crearProducto(producto, grupo.nombre);
    }
  }

  console.log('\n Finalizado el proceso de carga.');
}

// EJECUTAR 
cargarProductos();
