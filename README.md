# CRUD Receitas - API REST

Sistema de gerenciamento de receitas culinárias com ingredientes.

## Tecnologias

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- SQLite

## Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   └── server.ts
├── prisma/
│   └── schema.prisma
└── package.json
```

## Instalação e Configuração

1. Clone o repositório:
```bash
git clone https://github.com/natanaelbalbo/crud-prova-escola-ti.git
cd crud-prova-escola-ti
```

2. Instale as dependências:
```bash
cd backend
npm install
```

3. Configure o banco de dados:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. Inicie o servidor:
```bash
npm run dev
```

O servidor rodará em: `http://localhost:3001`

## Endpoints da API

### Receitas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/receitas` | Lista todas as receitas |
| POST | `/api/receitas` | Cria nova receita |
| PUT | `/api/receitas/:id` | Atualiza receita por ID |
| DELETE | `/api/receitas/:id` | Deleta receita por ID |

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

```bash
npm run dev     # Inicia servidor em desenvolvimento
npm run build   # Compila TypeScript
npm start       # Inicia servidor em produção
```