import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  // Lembre-se de colocar o IP real da sua máquina aqui!
  baseURL: "http://192.168.1.15/smart-lock-backend/public/api",
});

// Interceptor: antes de qualquer requisição sair, ele injeta o token
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
