# 🕹️ Type Hacker – Jogo de Digitação Estilo Hacker (Front-end)

## 🎯 Visão Geral
**Type Hacker** é um jogo de digitação com estética inspirada em simulações de hackers. O jogador deve digitar corretamente palavras que surgem na tela, antes que elas alcancem o final. A experiência simula uma corrida contra o tempo, exigindo atenção e agilidade na digitação.

Este repositório contém o **Front-end** do projeto Type Hacker, desenvolvido com React e Vite. O **Back-end**, responsável por autenticação, pontuação e armazenamento de partidas, está disponível em um repositório separado.

---

## 👥 Equipe do Projeto
Este projeto foi desenvolvido por:

- [Danniel Eduardo Dorox](https://github.com/D0ROX)
- [Gabriel Silva Costa](https://github.com/gabrielcosta07)
- [Reinaldo Castellano](https://github.com/CastellPg)
- [Murilo Santos](https://github.com/murilossx)

---

## 🏗️ Estrutura do Projeto

### 🖥️ Front-end (Este Repositório)
- **Responsabilidades:** Interface do jogo, lógica de digitação, contagem de tempo, verificação de erros, comunicação com a API.
- **Tecnologias:** React, Vite, CSS.

### ⚙️ Back-end (Repositório Separado)
- **Responsabilidades:** Autenticação, controle de sessões, armazenamento de partidas e pontuação.
- **Tecnologias:** PHP, MySQL.

---

## 🎮 Mecânica do Jogo

- ⏱️ **Contador de tempo:** Mostra quantos segundos a partida durou.
- 🧠 **Erros de digitação:** Ao cometer **3 erros**, a partida é encerrada.
- ❌ **Palavra chegou ao fim da tela:** O jogo termina automaticamente.
- ✅ **Objetivo:** Digitar corretamente o máximo possível de palavras antes de cometer 3 erros ou deixar uma palavra atingir o final da tela.

---

## 🔐 Autenticação

- **Login com email e senha**: Interface no Front-end, lógica de verificação no Back-end.
- **Sessão persistente**: O usuário permanece logado durante a sessão ativa, via gerenciamento de sessão do Back-end.
- **Cadastro de novos usuários**: Interface para registro com validações básicas no Front-end.

---

## 🛠️ Tecnologias Utilizadas

| Camada         | Tecnologia             | Função                                           |
|----------------|------------------------|--------------------------------------------------|
| **Front-end**  | React, Vite, CSS       | Interface do usuário e lógica do jogo            |
| **Back-end**   | PHP                    | API REST para autenticação e pontuação           |
| **Banco de Dados** | MySQL              | Armazenamento de usuários e partidas             |

---

## 📊 Funcionalidades

- 🔐 Autenticação de usuários (login e registro)
- ⏱️ Contador de tempo da partida
- ❌ Fim de jogo após 3 erros de digitação
- 📉 Fim de jogo se a palavra chegar ao final da tela
- 🧾 Registro e histórico de partidas
- 🏆 Sistema de ranking global e por ligas
- 👥 Criação e entrada em ligas com código de acesso

> ℹ️ Algumas funcionalidades estão ligadas ao Back-end via API e dependem de sua disponibilidade/configuração.

