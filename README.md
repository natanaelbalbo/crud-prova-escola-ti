# CRUD Receitas - Sistema Completo

Sistema de gerenciamento de receitas culinárias com ingredientes.

## Tecnologias

### Backend
- Node.js
- TypeScript
- Express.js
- Prisma ORM
- SQLite

### Frontend
- React 18
- TypeScript
- Vite
- Axios
- CSS3

## Estrutura do Projeto

```
crud-prova-escola-ti/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── types/
    │   └── App.tsx
    └── package.json
```

## Instalação e Configuração

### 1. Clone o repositório:
```bash
git clone https://github.com/natanaelbalbo/crud-prova-escola-ti.git
cd crud-prova-escola-ti
```

### 2. Configuração do Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` na pasta backend:
```env
DATABASE_URL="file:./dev.db"
```

Configure o banco de dados:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

Inicie o servidor backend:
```bash
npm run dev
```

O servidor backend rodará em: `http://localhost:3001`

### 3. Configuração do Frontend

Abra um novo terminal e execute:

```bash
cd frontend
npm install
```

Inicie o servidor frontend:
```bash
npm run dev
```

O servidor frontend rodará em: `http://localhost:5173`

### 4. Acesso à Aplicação

Após iniciar ambos os servidores:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

Certifique-se de que ambos estão rodando para o funcionamento completo da aplicação.

## Endpoints da API

### Receitas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/receitas` | Lista todas as receitas |
| POST | `/api/receitas` | Cria nova receita |
| PUT | `/api/receitas/:id` | Atualiza receita por ID |
| DELETE | `/api/receitas/:id` | Deleta receita por ID |

### Ingredientes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/receitas/:id/ingredientes` | Adiciona ingrediente à receita |
| DELETE | `/api/ingredientes/:ingredienteId` | Remove ingrediente específico |

## Exemplos de Uso

### Criar Receita (POST)
```json
{
  "nome": "Bolo de Chocolate",
  "tempoPreparo": 60,
  "custoAproximado": 15.50,
  "ingredientes": ["Farinha", "Chocolate", "Ovos", "Açúcar"]
}
```

### Atualizar Receita (PUT)
```json
{
  "nome": "Bolo de Chocolate Premium",
  "tempoPreparo": 90,
  "custoAproximado": 25.00,
  "ingredientes": ["Farinha", "Chocolate belga", "Ovos", "Açúcar"]
}
```

### Adicionar Ingrediente (POST)
```json
{
  "nome": "Sal"
}
```

### Remover Ingrediente (DELETE)
```
DELETE /api/ingredientes/3
Sem body - apenas DELETE com ingredienteId na URL
```

## Modelo de Dados

### Receita
- id: Identificador único
- nome: Nome da receita
- tempoPreparo: Tempo em minutos
- custoAproximado: Custo em reais
- ingredientes: Lista de ingredientes
- createdAt: Data de criação
- updatedAt: Data de atualização

### Ingrediente
- id: Identificador único
- nome: Nome do ingrediente
- receitaId: ID da receita (chave estrangeira)

## Scripts Disponíveis

### Backend
```bash
npm run dev     # Inicia servidor em desenvolvimento
npm run build   # Compila TypeScript
npm start       # Inicia servidor em produção
```

### Frontend
```bash
npm run dev     # Inicia servidor de desenvolvimento
npm run build   # Compila para produção
npm run preview # Visualiza build de produção
```

## Funcionalidades

### Interface Web
- Listar todas as receitas
- Criar nova receita com ingredientes
- Editar receita existente
- Excluir receita
- Adicionar ingredientes individualmente
- Remover ingredientes específicos
- Interface responsiva e intuitiva

### API REST
- CRUD completo de receitas
- Gerenciamento de ingredientes
- Relacionamento 1:N entre receitas e ingredientes