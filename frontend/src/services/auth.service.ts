import api from "./api";
import type { LoginResponse, RegisterPayload } from "../types";

export async function login(email: string, password: string) {
  const { data } = await api.post<LoginResponse>("/auth/login", { email, password });
  localStorage.setItem("authToken", data.token);
  return data;
}

export async function register(nombre: string, email: string, password: string) {
  const payload: RegisterPayload = { nombre, email, password };
  const { data } = await api.post("/auth/register", payload);
  localStorage.setItem("authToken", data.token);
  return data;
}

export function logout() {
  localStorage.removeItem("authToken");
}
