import React from 'react';
import type { Receita } from '../types';

interface ReceitaCardProps {
  receita: Receita;
  onEdit: (receita: Receita) => void;
  onDelete: (id: number) => void;
  onAddIngrediente: (receitaId: number) => void;
  onRemoveIngrediente: (ingredienteId: number) => void;
}

const ReceitaCard: React.FC<ReceitaCardProps> = ({
  receita,
  onEdit,
  onDelete,
  onAddIngrediente,
  onRemoveIngrediente,
}) => {
  return (
    <div className="receita-card">
      <div className="receita-header">
        <h3>{receita.nome}</h3>
        <div className="receita-actions">
          <button onClick={() => onEdit(receita)} className="btn-edit">
            Editar
          </button>
          <button onClick={() => onDelete(receita.id)} className="btn-delete">
            Excluir
          </button>
        </div>
      </div>
      
      <div className="receita-info">
        <p><strong>Tempo de Preparo:</strong> {receita.tempoPreparo} minutos</p>
        <p><strong>Custo Aproximado:</strong> R$ {receita.custoAproximado.toFixed(2)}</p>
      </div>

      <div className="ingredientes-section">
        <div className="ingredientes-header">
          <h4>Ingredientes ({receita.ingredientes.length})</h4>
          <button 
            onClick={() => onAddIngrediente(receita.id)} 
            className="btn-add-ingrediente"
          >
            + Adicionar
          </button>
        </div>
        
        {receita.ingredientes.length > 0 ? (
          <ul className="ingredientes-list">
            {receita.ingredientes.map((ingrediente) => (
              <li key={ingrediente.id} className="ingrediente-item">
                <span>{ingrediente.nome}</span>
                <button
                  onClick={() => onRemoveIngrediente(ingrediente.id)}
                  className="btn-remove-ingrediente"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-ingredientes">Nenhum ingrediente cadastrado</p>
        )}
      </div>
    </div>
  );
};

export default ReceitaCard;