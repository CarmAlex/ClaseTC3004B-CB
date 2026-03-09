// src/services/api.js
import axios from 'axios';
const API_URL = 'http://localhost:5001/api/usuarios';
export const getUsuarios = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
};
export const getUsuario = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
};
export const createUsuario = async (usuario) => {
    try {
        const response = await axios.post(API_URL, usuario);
        return response.data;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};
export const updateUsuario = async (id, usuario) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, usuario);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
};
export const deleteUsuario = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    }
};
