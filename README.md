# Sistema Escolar API

API REST para gerenciamento escolar, desenvolvida em TypeScript com Node.js, Express e Prisma ORM. Permite gerenciar alunos, professores, turmas, matrículas, notas e frequência.

## Tecnologias

- **Node.js** com **TypeScript**
- **Express** — framework HTTP
- **Prisma ORM** — acesso e modelagem do banco de dados
- **PostgreSQL** — banco de dados relacional
- **Docker Compose** — orquestração do banco de dados

## Arquitetura

O projeto segue uma arquitetura em camadas, separando responsabilidades:

```
Routes → Controller → Service → Repository → Database
```

- **Routes** — define os endpoints e conecta às instâncias dos controllers
- **Controller** — recebe a requisição HTTP, extrai os dados e chama o service
- **Service** — contém as regras de negócio (validações, verificações de existência)
- **Repository** — único responsável por se comunicar com o banco de dados via Prisma

## Estrutura de pastas

```
src/
├── modules/
│   ├── students/
│   │   ├── students.routes.ts
│   │   ├── students.controller.ts
│   │   ├── students.service.ts
│   │   └── students.repository.ts
│   ├── teachers/
│   ├── class/
│   ├── enrollments/
│   ├── grades/
│   └── attendance/
├── shared/
│   ├── middlewares/
│   │   └── error.middleware.ts
│   ├── prisma/
│   │   └── client.ts
│   └── utils/
│       └── app.error.ts
├── generated/
│   └── prisma/
├── app.ts
└── server.ts

prisma/
├── schema.prisma
└── migrations/
```

## Modelo de dados

O sistema é composto por seis entidades principais:

- **Student** — alunos cadastrados no sistema
- **Teacher** — professores, cada um com sua disciplina
- **Class** — turmas, vinculadas a um professor responsável
- **Enrollment** — matrícula, relaciona um aluno a uma turma
- **Grade** — notas de um aluno em uma turma
- **Attendance** — registros de presença/ausência de um aluno em uma turma

### Relacionamentos

- Um **Teacher** possui várias **Class**
- Um **Student** se matricula em várias **Class** através de **Enrollment**
- **Grade** e **Attendance** pertencem a um **Student** e a uma **Class**

## Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- npm

## Instalação

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
PORT=3000
NODE_ENV=development
```

3. Suba o banco de dados com Docker:

```bash
docker compose up -d
```

4. Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

5. Gere o Prisma Client:

```bash
npx prisma generate
```

## Executando o projeto

**Modo desenvolvimento** (com hot reload):

```bash
npm run dev:backend
```

**Build para produção:**

```bash
npm run build:backend
```

**Executar build de produção:**

```bash
npm start
```

O servidor inicia em `http://localhost:3000` (ou na porta definida em `PORT`).

## Endpoints

### Students

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/students` | Cria um novo aluno |
| GET | `/students` | Lista todos os alunos |
| GET | `/students/:id` | Busca um aluno pelo id |
| PUT | `/students/:id` | Atualiza um aluno |
| DELETE | `/students/:id` | Remove um aluno |

### Teachers

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/teachers` | Cria um novo professor |
| GET | `/teachers` | Lista todos os professores |
| GET | `/teachers/:id` | Busca um professor pelo id |
| PUT | `/teachers/:id` | Atualiza um professor |
| DELETE | `/teachers/:id` | Remove um professor (bloqueado se houver turmas vinculadas) |

### Classes

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/classes` | Cria uma nova turma |
| GET | `/classes` | Lista todas as turmas |
| GET | `/classes/:id` | Busca uma turma pelo id |
| PUT | `/classes/:id` | Atualiza uma turma |
| DELETE | `/classes/:id` | Remove uma turma |

### Enrollments

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/enrollments` | Matricula um aluno em uma turma |
| GET | `/enrollments` | Lista todas as matrículas |
| GET | `/enrollments/:id` | Busca uma matrícula pelo id |
| DELETE | `/enrollments/:id` | Remove uma matrícula |

### Grades

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/grades` | Lança uma nova nota |
| GET | `/grades` | Lista todas as notas |
| GET | `/grades/:id` | Busca uma nota pelo id |
| GET | `/grades/student/:studentId` | Lista as notas de um aluno |
| PUT | `/grades/:id` | Atualiza uma nota |
| DELETE | `/grades/:id` | Remove uma nota |

### Attendance

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/attendance` | Registra uma presença/ausência |
| GET | `/attendance` | Lista todos os registros |
| GET | `/attendance/:id` | Busca um registro pelo id |
| GET | `/attendance/student/:studentId` | Lista presenças de um aluno |
| GET | `/attendance/class/:classId` | Lista presenças de uma turma |
| PUT | `/attendance/:id` | Atualiza um registro |
| DELETE | `/attendance/:id` | Remove um registro |

## Exemplo de uso

Criar um aluno:

```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "nome": "João Silva",
    "birthDate": "2000-01-15T00:00:00.000Z"
  }'
```

Resposta:

```json
{
  "id": 1,
  "email": "joao@email.com",
  "nome": "João Silva",
  "birthDate": "2000-01-15T00:00:00.000Z",
  "createdAt": "2026-05-29T20:10:00.000Z"
}
```

## Tratamento de erros

A API utiliza uma classe `AppError` para padronizar erros de negócio. Todas as respostas de erro seguem o formato:

```json
{
  "status": "error",
  "message": "Descrição do erro"
}
```

Erros não tratados retornam status `500` com mensagem genérica, sem expor detalhes internos da aplicação.

## Banco de dados

Para visualizar e gerenciar os dados de forma gráfica, utilize o Prisma Studio:

```bash
npx prisma studio
```
