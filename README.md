# Sistema de Gestão de Restaurantes

Este projeto visa gerenciar informações de um restaurante, permitindo o cadastro, listagem e visualização de detalhes de pratos, com foco em uma experiência visual de cardápio. Os dados serão consumidos de uma API.

---

## Funcionalidades do Sistema

* **Tela Inicial:** Exibe o logo do restaurante e serve como ponto de entrada do sistema.
* **Tela de Cadastro de Prato:** Permite cadastrar um novo prato, informando:
    * Nome do Prato
    * Descrição
    * Preço
    * Categoria (Ex: Entrada, Prato Principal, Sobremesa, Bebida)
    * Disponibilidade (Ex: Em estoque, Esgotado)
    * URL da Imagem do Prato: Um campo para inserir o link de uma imagem do prato.
* **Tela de Cardápio (Listagem de Pratos):** Apresenta todos os pratos cadastrados de forma visualmente organizada, exibindo a imagem, nome e preço.

---

## Estrutura Sugerida das Páginas

* **Inicial:**
    Exibe o logo do restaurante e um menu para navegar para o cadastro de pratos ou para o Cardápio.
* **Cadastro de Prato:**
    Formulário para inserir os dados do prato, incluindo o campo para a URL da imagem. Ao salvar, os dados são enviados para uma API (ou salvos localmente, caso não haja backend).
* **Cardápio (Lista de Pratos):**
    Mostra todos os pratos cadastrados, exibindo a imagem do prato, o nome e o preço, organizados em um layout de grade ou similar, remetendo a um menu de restaurante visual. Pode ter opções de filtragem por categoria.

---

## Exemplo de Estrutura de Dados do Prato

```json
{
  "id": 1,
  "nomePrato": "Salada Caesar",
  "descricao": "Alface americana, croutons, queijo parmesão e molho caesar.",
  "preco": 29.00,
  "categoria": "Entrada",
  "disponibilidade": "Em estoque",
  "urlImagem": "[https://example.com/imagens/salada-caesar.jpg](https://example.com/imagens/salada-caesar.jpg)"
}

```

# Dicas de Implementação

- Utilize `react-router-dom` para navegação entre as páginas.
- Use hooks (`useState`, `useEffect`) para gerenciar estado e buscar dados da API.
- Para consumir a API, utilize `axios`.
- Crie componentes separados para cada página:
  - `Home.js`
  - `CadastroPrato.js`
  - `Cardapio.js`

---

## Exemplo de Rotas

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CadastroPrato from "./CadastroPrato";
import Cardapio from "./Cardapio"; // Renomeado de ListaPratos para Cardapio

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<CadastroPrato />} />
        <Route path="/cardapio" element={<Cardapio />} /> {/* Rota para o cardápio */}
      </Routes>
    </BrowserRouter>
  );
}
```

# API

## Alterações na API com Spring Boot

Faça as mudanças necessárias na API feita com **Spring Boot** para gerenciar pratos, incluindo o novo campo:

- `urlImagem` (tipo: `String`) — Este campo deve armazenar a URL da imagem do prato.

## Conexão com Banco de Dados MySQL

Implemente a conexão da aplicação com um banco de dados **MySQL**, garantindo que:

- As configurações de conexão estejam corretamente definidas no arquivo `application.properties`.
- As entidades estejam mapeadas corretamente para refletir as tabelas no banco de dados.
- O campo `urlImagem` esteja presente na tabela correspondente aos pratos.
