export interface Ingrediente {
  id: number;
  nome: string;
  receitaId: number;
}

export interface Receita {
  id: number;
  nome: string;
  tempoPreparo: number;
  custoAproximado: number;
  createdAt: string;
  updatedAt: string;
  ingredientes: Ingrediente[];
}

export interface CreateReceitaRequest {
  nome: string;
  tempoPreparo: number;
  custoAproximado: number;
  ingredientes: string[];
}

export interface CreateIngredienteRequest {
  nome: string;
}