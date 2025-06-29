# 🏥 Sistema de Gerenciamento de Consultas - Projeto Hospital

## 👨‍💻 Integrantes
  #### Thiago Roberto Rocha  
  #### Adenilton Ribeiro  
  #### Júlia Martins  
  #### Jean Michel  
  #### Priscila Anselmo  

## 📊 Visão Geral

#### Este é um sistema web simples para gerenciamento de consultas hospitalares. Desenvolvido com HTML, CSS e JavaScript (Vanilla JS), conecta-se a uma API backend REST hospedada no Render.

## 📚 Tecnologias Utilizadas

#### Frontend: HTML5, CSS3, JavaScript puro

#### Backend: API RESTful (já existente e pronta)

#### Hospedagem do backend: Render

## 🔧 Funcionalidades

### 1. Listagem de Consultas

#### Requisição: GET /consultas/findAll

#### Exibe em uma tabela:

#### Nome do paciente

#### Especialidade do médico

#### Data e hora

#### Ações: Editar, Detalhes, Excluir (com ícones)

### 2. Adicionar Consulta

#### Modal com formulário de inserção

#### Campos: descrição, data, hora, ID do médico, ID do paciente

#### Envio via: POST /consultas/create

### 3. Editar Consulta

#### Abre modal com dados preenchidos

#### Campos editáveis: descrição, data, hora

#### IDs ocultos para médico e paciente

#### Envio via: PUT /consultas/update/{id}

### 4. Visualizar Detalhes

#### Exibe modal com informações completas da consulta:

#### Paciente (nome e idade)

#### Médico (nome e especialidade)

#### Data, horário e descrição

### 5. Excluir Consulta

#### Confirmação com confirm()

#### Envio via: DELETE /consultas/delete/{id}

### 6. Listar Médicos

#### Requisição: GET /medicos/findAll

#### Exibe uma lista de todos os médicos cadastrados, com informações como ID, nome, CRM e especialidade. Permite busca por nome.

### 7. Cadastro de Médico

#### Formulário para cadastrar um novo médico.

#### Campos principais: nome, CRM, especialidade.

#### Envio via: POST /medicos/create

#### Validação dos campos realizada no frontend (exemplo: nome aceita letras, espaços, hífens, apóstrofos e pontos; CRM com até 8 caracteres alfanuméricos).

### 8. Editar Médico

#### Busca por nome para localizar o médico.

#### Permite edição dos dados do médico selecionado.

#### Envio via: PUT /medicos/update/{id}

### 9. Excluir Médico

#### Busca por nome para localizar o médico.

#### Exclusão confirmada via modal de confirmação.

#### Envio via: DELETE /medicos/delete/{id}

## 🎨 Estilo Visual (CSS)

#### Paleta de cores utilizada:

#### #03045E Azul escuro

#### #0077B6 Azul médio

#### #00B4D8 Azul claro

#### #90E0EF Azul pastel

#### #CAF0F8 Azul muito claro

#### #FFFFFF Branco
 
#### Componentes estilizados:

#### Tabela centralizada, com bordas e zebra rows

#### Botões com ícones (editar, visualizar, excluir)

#### Modais com fundo escurecido e área central destacada

## ⚖️ Regras e Validação

#### Datas tratadas no formato dd/mm/yyyy conforme o backend

#### IDs de médico e paciente enviados de forma segura e invisível ao usuário

#### Validação de campos obrigatórios no front

## ✨ Melhorias Futuras

#### Select para escolher médico/paciente em vez de digitar ID

#### Responsividade para dispositivos móveis

#### Sistema de login (admin, médico, paciente)

#### Integração com banco de dados para nomes reais

## 🚀 Como Rodar o Projeto

#### Clone o repositório

#### Abra o arquivo index.html em um navegador moderno

#### Certifique-se de que a API esteja online no Render

## 📅 Status do Projeto

### ✅ Finalizado com as funcionalidades essenciais
