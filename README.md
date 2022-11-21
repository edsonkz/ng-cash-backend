# NG-CASH-TESTE-BACKEND

Aplicação em TypeScript simulando um sistema de transações financeiras entre usuários.

## Bibliotecas/Frameworks Utilizadas

-   Node.js,
-   Express.js,
-   React.js,
-   TypeScript,
-   TypeORM,
-   Bcrypt,
-   Class-validator,
-   PostgreSQL.

## Como executar?

A aplicação necessita do Node.js versão 16 para executar localmente e do Docker 20.10.21 para executar
como container. Nos dois casos é preciso ter um arquivo .env, no diretório raiz, preenchido baseando-se nas variáveis
apresentadas em .env.sample.

### Formato do .env

-   `TOKEN_SECRET=` token utilizado para gera o JWT para validar os usuários
-   `DB_USER=` username do banco PostgreSQL a ser conectado
-   `DB_ROOT_PASSWORD=` senha do banco PostgreSQL a ser conectado
-   `DB_DATABASE=` nome do banco PostgreSQL a ser conectado

### Executando Localmente

No diretório local utilize os seguintes comandos no seu terminal de uso:

-   `npm install`
-   `npm run start:local`
-   Acesse `http://localhost:3333/`

### Executando Utilizando Docker:

No diretório local utilize os seguintes comandos no seu terminal de uso:

-   Execute `docker-composite up` no diretório raiz.
-   Acesse `http://localhost:3333/`

## Esquemas de Páginas:

-   A página raiz é a de criar um usuário, a partir dela pode-se redirecionar para a de login ou criar um usuário
-   Após o login o usuário é redirecionado para `/home`.
