import axios from "axios";
import type { Product } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY  = import.meta.env.VITE_EXTERNAL_API_KEY;

const external = axios.create({ baseURL: BASE_URL });
external.interceptors.request.use((config) => {
  config.headers["x-api-key"] = API_KEY;
  return config;
});

// listar como cliente externo
export async function externalList(q?: string) {
  const { data } = await external.get<Product[]>("/productos", { params: { q } });
  return data;
}

// insertar estructuras 1,2,3 como cliente externo
export async function insertS1(p: {name:string;brand:string;model:string;color:string;price:number}) {
  const { data } = await external.post("/productos", p);
  return data;
}
export async function insertS2(p: {name:string;details:{brand:string;model:string;color:string};price:number}) {
  const { data } = await external.post("/productos", p);
  return data;
}
export async function insertS3(p: Array<{name:string;brand:string;model:string;data:Array<{price:number;color:string}>;}>) {
  const { data } = await external.post("/productos", p);
  return data;
}
