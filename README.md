# Movie Catalog App – React Native
## Sobre o Projeto

O Movie Catalog App é um aplicativo mobile desenvolvido em React Native, que consome a API pública do The Movie Database (TMDb) para exibir um catálogo de filmes atualizado. O objetivo é permitir que o usuário explore filmes, pesquise títulos específicos e organize sua lista pessoal de filmes que já assistiu ou deseja assistir.

O app foi desenvolvido como parte de um teste técnico para a empresa L2, avaliando habilidades em desenvolvimento mobile, consumo de APIs, gerenciamento de estado e persistência local.

## Funcionalidades

✅ Exibição do catálogo – Listar filmes obtidos da API do TMDb
✅ Busca de filmes – Permitir que o usuário pesquise por um filme específico
✅ Gerenciamento pessoal – O usuário pode marcar filmes como:

Já assistido

## Quero assistir
✅ Persistência local – Informações sobre o status de cada filme são salvas localmente no dispositivo

## Funcionalidade opcional implementada:
📅 Agendamento de data e hora para assistir ao filme, com possibilidade de adicionar lembrete na agenda do celular.


## Como rodar o projeto

Clone o repositório:

git clone https://github.com/Yuri-amaralsantos/MovieCatalogApp.git


Instale as dependências:

npm install


Variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione sua chave da API do TMDb:

API_KEY="api gerada no site do tmdb, exemplo 014e1e7d8488e5f62138421a6a3c9438" 
API_URL=https://api.themoviedb.org/3


Execute o projeto:

npx expo start


O app poderá ser visualizado no Expo Go ou em um emulador/simulador.

## Tecnologias Utilizadas

🔹 React Native – Construção da interface mobile
🔹 Expo – Facilita o desenvolvimento e execução do app
🔹 React Query – Consumo e cache da API
🔹 AsyncStorage – Persistência local de dados do usuário
🔹 TypeScript – Tipagem estática para maior segurança do código

## Estrutura do Projeto
/src
 ├─ /components      # Componentes reutilizáveis
 ├─ /app             # página principal e layout
 ├─ /hooks           # Serviços e integração com a API


## Desenvolvedor

Yuri Amaral Santos 🚀

