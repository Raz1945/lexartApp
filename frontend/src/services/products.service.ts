import api from "./api";
import type { Product } from "../types";

export async function getProducts(q?: string) {
  const { data } = await api.get<Product[]>("/productos", { params: { q } });
  return data;
}

export async function getProduct(id: number) {
  const { data } = await api.get<Product>(`/productos/${id}`);
  return data;
}

export async function createProduct(payload: {
  name: string; brand: string; model: string; price: number; color: string;
}) {
  const { data } = await api.post("/productos", payload);
  return data;
}

export async function updateProduct(id: number, payload: Partial<Product>) {
  const { data } = await api.put(`/productos/${id}`, payload);
  return data;
}

export async function deleteProduct(id: number) {
  const { data } = await api.delete(`/productos/${id}`);
  return data;
}
