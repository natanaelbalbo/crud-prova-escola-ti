import axios from 'axios';
import type { Receita, CreateReceitaRequest, CreateIngredienteRequest } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const receitaService = {
  async getAll(): Promise<Receita[]> {
    const response = await api.get('/receitas');
    return response.data;
  },

  async getById(id: number): Promise<Receita> {
    const response = await api.get(`/receitas/${id}`);
    return response.data;
  },

  async create(data: CreateReceitaRequest): Promise<Receita> {
    const response = await api.post('/receitas', data);
    return response.data;
  },

  async update(id: number, data: CreateReceitaRequest): Promise<Receita> {
    const response = await api.put(`/receitas/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/receitas/${id}`);
  },

  async addIngrediente(receitaId: number, data: CreateIngredienteRequest): Promise<void> {
    await api.post(`/receitas/${receitaId}/ingredientes`, data);
  },

  async removeIngrediente(ingredienteId: number): Promise<void> {
    await api.delete(`/ingredientes/${ingredienteId}`);
  },
};