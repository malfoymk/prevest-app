# 📚 PreVestApp — Versão Web

Aplicativo educacional para alunos da rede pública de SP se prepararem para vestibulares.  
Feito com **React 18 + Vite + TailwindCSS**, com backend **Node.js + PostgreSQL** e autenticação JWT.

> **Pré-requisito:** A API (`../prevest-app-api/`) precisa estar rodando antes de iniciar o frontend.

---

## ⚡ Como executar

> **Atenção:** O PowerShell do Windows bloqueia scripts npm por padrão.  
> Use sempre o **Prompt de Comando (CMD)**.

### 1. Suba a API primeiro

Siga as instruções em `../prevest-app-api/README.md`.

### 2. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto (já existe como exemplo):

```
VITE_API_URL=http://localhost:3001
```

### 3. Instale as dependências

```
cmd /c npm install
```

### 4. Rode em modo desenvolvimento

```
cmd /c npm run dev
```

Acesse: **http://localhost:5173**

### 5. Build de produção

```
cmd /c npm run build
```

Os arquivos otimizados serão gerados em `dist/`.

---

## �️ Páginas

| Página | Descrição |
|---|---|
| **Login / Cadastro** | Autenticação com e-mail e senha |
| **Início** | Dashboard com stats de estudo, próximas datas e acesso rápido |
| **Editais** | ENEM, FUVEST, UNICAMP, UNESP, Provão Paulista, SISU, PROUNI |
| **Agenda** | Cronograma semanal com sessões de estudo personalizadas |
| **Simulados** | Quiz estilo ENEM com timer, gabarito comentado e histórico |
| **Cursos** | Busca de cursos em USP, UNICAMP, UNESP, UNIFESP e FATEC |

---

## 💾 Armazenamento

Todos os dados ficam salvos no **PostgreSQL** via API REST. Nenhum dado sensível é guardado no navegador — apenas o token JWT no `localStorage`.

| Tabela | Conteúdo |
|---|---|
| `users` | Conta do estudante (e-mail, senha hash) |
| `sessions` | Sessões de estudo do cronograma |
| `simulados` | Histórico de simulados realizados |
| `notificacoes` | Vestibulares com lembrete ativado |
| `vestibulares` | Editais e calendário de provas |
| `cursos` | Cursos e universidades |
| `materias` / `questoes` | Banco de questões dos simulados |

---

## � Estrutura do projeto

```
prevest-app/
├── .env                    # VITE_API_URL
├── index.html
├── package.json
└── src/
    ├── App.jsx             # Rotas protegidas (React Router)
    ├── context/
    │   └── AuthContext.jsx # Estado de autenticação global
    ├── services/
    │   └── api.js          # Axios com interceptor JWT
    ├── components/
    │   └── BottomNav.jsx   # Barra de navegação inferior
    ├── data/
    │   ├── vestibulares.js # Funções utilitárias (formatação, cores)
    │   └── cursos.js       # Funções utilitárias (cores por área)
    └── pages/
        ├── Login.jsx       # Tela de login
        ├── Register.jsx    # Tela de cadastro
        ├── Home.jsx        # Dashboard
        ├── Vestibulares.jsx
        ├── Cronograma.jsx
        ├── Simulados.jsx
        └── Cursos.jsx
```

---

## �🛠️ Tecnologias

- [React 18](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS 3](https://tailwindcss.com/)
- [React Router DOM v6](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Lucide React](https://lucide.dev/)

---

> Para a versão **mobile (Android/iOS)** com Expo, veja `../prevest-app-native/`.  
> Para a **API backend**, veja `../prevest-app-api/`.
