import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

export const getReceitas = async (req: Request, res: Response) => {
    try {
        const receitas = await prisma.receita.findMany({
            include: {
                ingredientes: true
            }
        });
        res.status(201);
        res.json(receitas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar receitas' });
    }
};

export const createReceitas = async (req: Request, res: Response) => {
    try {
        const receitas = await prisma.receita.findMany();
        res.json(receitas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar receitas' });
    }
};