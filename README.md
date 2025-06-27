# 🕹️ Type Hacker – Jogo de Digitação Estilo Hacker

![Gameplay do Type Hacker](https://i.imgur.com/uRHRa9x.gif)
_(Dica: Grave um GIF da sua tela de jogo e substitua o link acima para mostrar seu projeto em ação!)_

---

### 📖 Sobre o Projeto

**Type Hacker** é um jogo de digitação dinâmico e desafiador com uma temática hacker. O objetivo é testar e aprimorar a velocidade e precisão de digitação do jogador. Palavras "caem" pela tela e o jogador deve digitá-las corretamente antes que atinjam o final.

Este repositório contém o **Frontend** do projeto, responsável por toda a interface visual, a lógica e a interatividade do jogo. Ele se comunica com uma API REST em PHP para funcionalidades online como autenticação, ligas e rankings.

---

### ✨ Funcionalidades

- **Gameplay Dinâmico:** Palavras caem em velocidade progressiva, aumentando o desafio.
- **Sistema de Pontuação:** Pontos calculados com bônus por sequências de acertos.
- **Game Over:** A partida termina ao cometer 3 erros ou se uma palavra não for digitada a tempo.
- **Sistema de Ligas:** Crie, proteja com senha, entre, participe, saia ou (se for o criador) exclua ligas competitivas.
- **Rankings Abrangentes:** Compare sua melhor pontuação no ranking Geral, Semanal ou no placar de membros da sua Liga.
- **Histórico de Partidas:** Acompanhe seu progresso com um histórico detalhado de suas partidas.
- **Autenticação de Usuários:** Sistema completo de cadastro e login para salvar todo o progresso.

---

### ⚙️ Funcionamento do Sistema

Esta seção detalha a lógica interna e as regras que governam o Type Hacker.

#### 1. Lógica do Jogo (Gameplay)

A tela principal do jogo é controlada por uma máquina de estados em React que gerencia a jogabilidade da seguinte forma:

- **Início da Partida:** Ao carregar, o jogo é iniciado, um cronômetro começa a contar e a primeira palavra é sorteada de um banco de palavras (`palavras.json`) e começa a cair.
- **Queda das Palavras:** A velocidade de queda aumenta progressivamente com base no número de erros e acertos totais do jogador, tornando o jogo mais desafiador.
- **Validação:** Ao pressionar "Enter", o sistema compara o texto digitado com a palavra atual.
  - **Em caso de acerto:** O jogador ganha pontos, uma animação de sucesso é ativada e uma nova palavra é sorteada.
  - **Em caso de erro:** A sequência de acertos é zerada, o contador de erros aumenta e uma animação de "tremor" indica o erro.
- **Fim de Jogo:** A partida termina se o jogador acumular 3 erros ou se uma palavra atingir a área de digitação. Ao final, os dados da partida são enviados para o backend para salvar a pontuação.

#### 2. Sistema de Pontuação e Ranking

- **Pontuação por Palavra:** A pontuação base por acerto é de **10 pontos**, com um bônus adicional igual à **sequência de acertos** atual, recompensando a consistência.
- **Ranking Geral/Semanal:** O sistema busca no banco de dados a **maior pontuação (`MAX(pontos)`)** já registrada para cada jogador e os ordena. O ranking semanal aplica um filtro para considerar apenas partidas dos últimos 7 dias.
- **Ranking de Liga:** O ranking de membros de uma liga é calculado com base na **maior pontuação (`MAX(pontos)`)** de cada jogador registrada especificamente para aquela liga.

#### 3. Gerenciamento de Ligas

- **Criação e Segurança:** Qualquer usuário pode criar uma liga com nome e senha. A senha é criptografada (`password_hash`) no backend para segurança, e o criador torna-se o primeiro membro.
- **Entrada:** Para entrar em uma liga, a senha fornecida é verificada (`password_verify`) pelo backend.
- **Exclusão e Saída:** Membros podem sair de ligas. Apenas o criador pode excluir a liga, uma ação que apaga a liga, todos os seus membros e o histórico de partidas associadas para manter a integridade do banco de dados.

---

### 🛠️ Tecnologias Utilizadas

| Camada             | Tecnologia                                   |
| :----------------- | :------------------------------------------- |
| 🖥️ **Frontend**    | **React (com Vite)**, CSS Puro, React Router |
| ⚙️ **Backend**     | **PHP**, MySQL, Servidor Apache (via XAMPP)  |
| 🔄 **Comunicação** | API REST com formato **JSON**                |

---

### 🚀 Como Rodar o Projeto Localmente

Para executar o projeto completo, você precisará configurar o Backend e o Frontend.

#### 1. Configuração do Backend

1.  **Clone o repositório do backend:**
    ```bash
    git clone [https://github.com/gabrielcosta07/Trabalho-Web1-Jogo-Back.git](https://github.com/gabrielcosta07/Trabalho-Web1-Jogo-Back.git)
    ```
2.  Mova a pasta clonada para o diretório `htdocs` da sua instalação do XAMPP.
3.  Inicie os serviços **Apache** e **MySQL** no painel de controle do XAMPP.
4.  Abra seu cliente de banco de dados (MySQL Workbench, phpMyAdmin) e crie um novo banco de dados (ex: `type_hacker`).
5.  Configure a conexão abrindo o arquivo `Trabalho-Web1-Jogo-Back/database/conection.php` e preenchendo com suas credenciais.
6.  Execute o script de criação de tabelas acessando no navegador: `http://localhost/Trabalho-Web1-Jogo-Back/database/createtable.php`.

#### 2. Configuração do Frontend (Este Repositório)

1.  **Instale as dependências:**
    ```bash
    npm install
    ```
2.  **Inicie a aplicação:**
    ```bash
    npm run dev
    ```
3.  Abra o navegador e acesse o endereço fornecido (geralmente `http://localhost:5173`).

---

### 👥 Equipe do Projeto

- [Danniel Eduardo Dorox](https://github.com/D0ROX)
- [Gabriel Silva Costa](https://github.com/gabrielcosta07)
- [Reinaldo Castellano](https://github.com/CastellPg)
- [Murilo da Silva Santos](https://github.com/murilossx)
