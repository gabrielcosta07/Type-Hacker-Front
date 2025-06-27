# 🕹️ Type Hacker – Jogo de Digitação Estilo Hacker (Back-end)

## 🎯 Visão Geral
Este repositório contém o código do **Back-end** do jogo Type Hacker. Ele é o responsável por cuidar da parte "invisível" do sistema: autenticar os usuários, salvar os dados das partidas, calcular pontuações, gerenciar ligas e retornar tudo isso pro Front-end de forma organizada, via API REST.

Toda a lógica é feita em PHP, usando um banco de dados MySQL. A comunicação com o Front é feita via JSON.

---

## 👥 Equipe do Projeto
Este projeto foi desenvolvido por:

- [Danniel Eduardo Dorox](https://github.com/D0ROX)
- [Gabriel Silva Costa](https://github.com/gabrielcosta07)
- [Reinaldo Castellano](https://github.com/CastellPg)
- [Murilo Santos](https://github.com/murilossx)

---

## 🏗️ Estrutura do Projeto

O sistema foi dividido em dois repositórios para facilitar o desenvolvimento:

### ⚙️ Back-end (Repositório Separado)
- **Responsável por:** autenticação, sessões, cadastro/login, envio de partidas, ranking e ligas.
- **Tecnologias:** PHP, MySQL, Apache (via XAMPP).
- [👉 Repositório do Back-end](https://github.com/gabrielcosta07/Trabalho-Web1-Jogo-Back)

### 🖥️ Front-end (Este Repositório)
- **Responsável por:** parte visual, lógica do jogo (verificação de palavras, tempo de jogo, fim de partida).
- **Tecnologias:** React, Vite, CSS.

---

## 🛠️ Tecnologias Utilizadas

| Camada         | Tecnologia        | Função                                                    |
|----------------|-------------------|-----------------------------------------------------------|
| Linguagem      | PHP               | Criar a API, validar dados, aplicar regras do sistema     |
| Banco de Dados | MySQL             | Armazenar usuários, partidas, pontuações, ligas           |
| Servidor       | Apache (XAMPP)    | Executar os scripts PHP e servir as requisições HTTP      |
| Comunicação    | JSON              | Trocar informações com o Front-end                        |

---
