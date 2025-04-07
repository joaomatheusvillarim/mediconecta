// src/services/api.ts
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000", // ou onde o backend estiver rodando
});
