# 🕹️ Type Hacker – Jogo de Digitação Estilo Hacker

## 🎯 Visão Geral
**Type Hacker** é um jogo de digitação inspirado em simulações de hackers. O jogador simula a invasão de sistemas através da digitação de linhas de código sob pressão. O objetivo é "quebrar firewalls" digitando corretamente os comandos exibidos na tela. Cada erro reduz o tempo restante, e a dificuldade aumenta conforme o progresso nas fases.

---

## 🎮 Gameplay

### 🧩 Estrutura de Fases

| Nível | Ambiente Alvo     | Descrição                                     | Penalidade por Erro |
|-------|--------------------|-----------------------------------------------|----------------------|
| 1     | Sistema de Empresa | Quebrar segurança básica de rede corporativa  | -⏱️ 1s               |
| 2     | Banco              | Superar firewalls com múltiplas autenticações | -⏱️ 2s               |
| 3     | Governo            | Invadir sistemas governamentais altamente seguros | -⏱️ 3s           |

- ⏱ **Tempo limite por fase:** Contador regressivo ao iniciar a fase.
- ⌨️ **Erros de digitação:** Reduzem o tempo restante.
- ✅ **Objetivo:** Completar a digitação de todos os comandos antes do tempo acabar.

---

## 🔐 Autenticação
- Página de **login** protegida com autenticação por email e senha.
- Sessão persistente via cookies ou `localStorage`.
- Cadastro de novos usuários com verificação simples.

---

## 🛠️ Tecnologias Utilizadas

| Camada      | Tecnologia              | Função                                  |
|-------------|--------------------------|------------------------------------------|
| Front-end   | React, Vite, CSS         | Interface do usuário e lógica do jogo   |
| Back-end    | PHP                      | API REST para autenticação e pontuação  |
| Banco de Dados | MySQL               | Armazenamento de usuários e partidas    |

---
## 📊 Funcionalidades

- 🔐 Autenticação de usuários (login e registro)
- 🎯 Sistema de níveis com dificuldade progressiva
- 🧠 Verificação de erros de digitação com penalidade de tempo
- 🏆 Ranking de jogadores (global e por ligas)
- 🧑‍🤝‍🧑 Sistema de criação/entrada em ligas com código
- 📈 Histórico de partidas por jogador
- 💬 Feedback visual e sonoro a cada comando correto ou erro

---

## 📱 Responsividade

- Interface adaptada para **desktop** e **mobile**
- Imagem de fundo otimizada para diferentes tamanhos de tela
- Caixa de login flutuante com ajuste de layout para telas menores

