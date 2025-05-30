# 🕹️ Type Hacker – Jogo de Digitação Estilo Hacker (Front-end)

## 🎯 Visão Geral
**Type Hacker** é um jogo de digitação inspirado em simulações de hackers. O jogador simula a invasão de sistemas através da digitação de linhas de código sob pressão. O objetivo é "quebrar firewalls" digitando corretamente os comandos exibidos na tela. Cada erro reduz o tempo restante, e a dificuldade aumenta conforme o progresso nas fases.

Este repositório/diretório contém o código do **Front-end** do projeto Type Hacker, desenvolvido com React e Vite. O Back-end, responsável pela API REST e interação com o banco de dados, está localizado em um diretório/repositório separado.

---

## 👥 Equipe do Projeto
Este projeto foi desenvolvido por:

- Danniel Eduardo Dorox - *(https://github.com/D0ROX)*
- Gabriel Silva Costa - *(https://github.com/gabrielcosta07)*
- Reinaldo Castellano - *(https://github.com/CastellPg)*
- Murilo Santos - *(https://github.com/murilossx)*
---

## 🏗️ Estrutura do Projeto
O projeto Type Hacker é conscientemente dividido em duas partes principais para melhor organização e desenvolvimento:

### 🖥️ Front-end (Este Repositório/Diretório)
- **Responsabilidades:** Interface do usuário (UI), experiência do usuário (UX), lógica do jogo (verificação de digitação, tempo, fases), e comunicação com a API do Back-end.
- **Tecnologias Principais:** React, Vite, CSS.

### ⚙️ Back-end (Diretório/Repositório Separado)
- **Responsabilidades:** Fornecer uma API REST para autenticação de usuários, gerenciamento de pontuações, armazenamento e recuperação de dados de usuários e partidas.
- **Tecnologias Principais:** PHP, MySQL.

---

## 🎮 Gameplay

### 🧩 Estrutura de Fases

| Nível | Ambiente Alvo      | Descrição                                     | Penalidade por Erro |
|-------|--------------------|-----------------------------------------------|----------------------|
| 1     | Sistema de Empresa | Quebrar segurança básica de rede corporativa  | -⏱️ 1s               |
| 2     | Banco              | Superar firewalls com múltiplas autenticações | -⏱️ 2s               |
| 3     | Governo            | Invadir sistemas governamentais altamente seguros | -⏱️ 3s            |

- ⏱ **Tempo limite por fase:** Contador regressivo ao iniciar a fase.
- ⌨️ **Erros de digitação:** Reduzem o tempo restante.
- ✅ **Objetivo:** Completar a digitação de todos os comandos antes do tempo acabar.

---

## 🔐 Autenticação (Lógica no Back-end, Interface no Front-end)
- Página de **login** protegida com autenticação por email e senha.
- Sessão persistente via cookies ou `localStorage` (gerenciada pelo front-end após autenticação bem-sucedida com o back-end).
- Cadastro de novos usuários com verificação simples (validações no front-end e processamento/armazenamento no back-end).

---

## 🛠️ Tecnologias Utilizadas

| Camada         | Tecnologia             | Função                                           |
|----------------|--------------------------|--------------------------------------------------|
| **Front-end** | **React, Vite, CSS** | **Interface do usuário e lógica do jogo (este repo)** |
| Back-end       | PHP                      | API REST para autenticação e pontuação           |
| Banco de Dados | MySQL                    | Armazenamento de usuários e partidas             |

---
## 📊 Funcionalidades

- 🔐 Autenticação de usuários (login e registro)
- 🎯 Sistema de níveis com dificuldade progressiva
- 🧠 Verificação de erros de digitação com penalidade de tempo
- 🏆 Ranking de jogadores (global e por ligas)
- 🧑‍🤝‍🧑 Sistema de criação/entrada em ligas com código
- 📈 Histórico de partidas por jogador

*(Nota: Muitas dessas funcionalidades dependem da interação com a API fornecida pelo Back-end.)*