import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const receitaController = {
  async create(req: Request, res: Response) {
    try {
      const { nome, tempoPreparo, custoAproximado, ingredientes } = req.body;
      const receita = await prisma.receita.create({
        data: {
          nome,
          tempoPreparo,
          custoAproximado,
          ingredientes: {
            create: ingredientes.map((ingrediente: string) => ({
              nome: ingrediente
            }))
          }
        },
        include: {
          ingredientes: true
        }
      });

      res.status(201).json(receita);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar receita' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const receitas = await prisma.receita.findMany({
        include: {
          ingredientes: true
        }
      });
      res.json(receitas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar receitas' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, tempoPreparo, custoAproximado, ingredientes } = req.body;

      const receita = await prisma.receita.update({
        where: { id: Number(id) },
        data: {
          nome,
          tempoPreparo,
          custoAproximado,
          ingredientes: {
            deleteMany: {}, // Remove todos os ingredientes antigos
            create: ingredientes.map((ingrediente: string) => ({
              nome: ingrediente
            }))
          }
        },
        include: {
          ingredientes: true
        }
      });

      res.json(receita);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar receita' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.receita.delete({
        where: { id: Number(id) }
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar receita' });
    }
  },

  async addIngrediente(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const ingrediente = await prisma.ingrediente.create({
        data: {
          nome,
          receitaId: Number(id)
        }
      });

      res.status(201).json(ingrediente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar ingrediente' });
    }
  },

  async removeIngrediente(req: Request, res: Response) {
    try {
      const { ingredienteId } = req.params;

      await prisma.ingrediente.delete({
        where: { id: Number(ingredienteId) }
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover ingrediente' });
    }
  }
};