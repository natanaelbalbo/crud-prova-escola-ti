import React, { useState, useEffect } from 'react';
import { receitaService } from '../services/api';
import type { Receita, CreateReceitaRequest } from '../types';
import ReceitaCard from './ReceitaCard';
import ReceitaForm from './ReceitaForm';

const ReceitasList: React.FC = () => {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReceita, setEditingReceita] = useState<Receita | null>(null);

  useEffect(() => {
    carregarReceitas();
  }, []);

  const carregarReceitas = async () => {
    try {
      setLoading(true);
      const data = await receitaService.getAll();
      setReceitas(data);
    } catch (error) {
      console.error('Erro ao carregar receitas:', error);
      alert('Erro ao carregar receitas. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: CreateReceitaRequest) => {
    try {
      await receitaService.create(data);
      setShowForm(false);
      carregarReceitas();
    } catch (error) {
      console.error('Erro ao criar receita:', error);
      alert('Erro ao criar receita');
    }
  };

  const handleEdit = async (data: CreateReceitaRequest) => {
    if (!editingReceita) return;
    
    try {
      await receitaService.update(editingReceita.id, data);
      setEditingReceita(null);
      setShowForm(false);
      carregarReceitas();
    } catch (error) {
      console.error('Erro ao atualizar receita:', error);
      alert('Erro ao atualizar receita');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
      try {
        await receitaService.delete(id);
        carregarReceitas();
      } catch (error) {
        console.error('Erro ao deletar receita:', error);
        alert('Erro ao deletar receita');
      }
    }
  };

  const openEditForm = (receita: Receita) => {
    setEditingReceita(receita);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingReceita(null);
  };

  const handleAddIngrediente = async (receitaId: number) => {
    const nome = prompt('Digite o nome do ingrediente:');
    if (nome?.trim()) {
      try {
        await receitaService.addIngrediente(receitaId, { nome: nome.trim() });
        carregarReceitas();
      } catch (error) {
        console.error('Erro ao adicionar ingrediente:', error);
        alert('Erro ao adicionar ingrediente');
      }
    }
  };

  const handleRemoveIngrediente = async (ingredienteId: number) => {
    if (window.confirm('Tem certeza que deseja remover este ingrediente?')) {
      try {
        await receitaService.removeIngrediente(ingredienteId);
        carregarReceitas();
      } catch (error) {
        console.error('Erro ao remover ingrediente:', error);
        alert('Erro ao remover ingrediente');
      }
    }
  };

  if (loading) {
    return <div className="loading">Carregando receitas...</div>;
  }

  return (
    <div className="receitas-container">
      <div className="receitas-header">
        <h1>Gerenciador de Receitas</h1>
        <button onClick={() => setShowForm(true)} className="btn-new">
          + Nova Receita
        </button>
      </div>

      {receitas.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma receita cadastrada ainda.</p>
          <button onClick={() => setShowForm(true)} className="btn-new">
            Criar primeira receita
          </button>
        </div>
      ) : (
        <div className="receitas-grid">
          {receitas.map((receita) => (
            <ReceitaCard
              key={receita.id}
              receita={receita}
              onEdit={openEditForm}
              onDelete={handleDelete}
              onAddIngrediente={handleAddIngrediente}
              onRemoveIngrediente={handleRemoveIngrediente}
            />
          ))}
        </div>
      )}

      {showForm && (
        <ReceitaForm
          receita={editingReceita || undefined}
          onSubmit={editingReceita ? handleEdit : handleCreate}
          onCancel={closeForm}
          isEditing={!!editingReceita}
        />
      )}
    </div>
  );
};

export default ReceitasList;