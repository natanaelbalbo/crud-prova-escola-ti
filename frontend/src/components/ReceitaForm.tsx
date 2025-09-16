import React, { useState, useEffect } from 'react';
import type { Receita, CreateReceitaRequest } from '../types';

interface ReceitaFormProps {
  receita?: Receita;
  onSubmit: (data: CreateReceitaRequest) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const ReceitaForm: React.FC<ReceitaFormProps> = ({
  receita,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<CreateReceitaRequest>({
    nome: '',
    tempoPreparo: 0,
    custoAproximado: 0,
    ingredientes: [],
  });

  const [novoIngrediente, setNovoIngrediente] = useState('');

  useEffect(() => {
    if (receita && isEditing) {
      setFormData({
        nome: receita.nome,
        tempoPreparo: receita.tempoPreparo,
        custoAproximado: receita.custoAproximado,
        ingredientes: receita.ingredientes.map(ing => ing.nome),
      });
    }
  }, [receita, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const adicionarIngrediente = () => {
    if (novoIngrediente.trim()) {
      setFormData(prev => ({
        ...prev,
        ingredientes: [...prev.ingredientes, novoIngrediente.trim()]
      }));
      setNovoIngrediente('');
    }
  };

  const removerIngrediente = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredientes: prev.ingredientes.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="receita-form-overlay">
      <div className="receita-form">
        <h2>{isEditing ? 'Editar Receita' : 'Nova Receita'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome da Receita:</label>
            <input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tempoPreparo">Tempo de Preparo (minutos):</label>
              <input
                type="number"
                id="tempoPreparo"
                value={formData.tempoPreparo}
                onChange={(e) => setFormData(prev => ({ ...prev, tempoPreparo: Number(e.target.value) }))}
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="custoAproximado">Custo Aproximado (R$):</label>
              <input
                type="number"
                id="custoAproximado"
                step="0.01"
                value={formData.custoAproximado}
                onChange={(e) => setFormData(prev => ({ ...prev, custoAproximado: Number(e.target.value) }))}
                required
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Ingredientes:</label>
            <div className="ingredientes-input">
              <input
                type="text"
                value={novoIngrediente}
                onChange={(e) => setNovoIngrediente(e.target.value)}
                placeholder="Digite um ingrediente"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarIngrediente())}
              />
              <button type="button" onClick={adicionarIngrediente}>
                Adicionar
              </button>
            </div>
            
            {formData.ingredientes.length > 0 && (
              <ul className="ingredientes-form-list">
                {formData.ingredientes.map((ingrediente, index) => (
                  <li key={index} className="ingrediente-form-item">
                    <span>{ingrediente}</span>
                    <button type="button" onClick={() => removerIngrediente(index)}>
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              {isEditing ? 'Atualizar' : 'Criar'} Receita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceitaForm;