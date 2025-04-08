// src/services/api.ts
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000", // ou onde o backend estiver rodando
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
