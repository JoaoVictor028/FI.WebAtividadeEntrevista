 # 🧪 Teste Prático - Vaga de Desenvolvedor (.NET Framework)

Este repositório contém a solução para o teste prático proposto pela empresa **Função Sistemas**, com o objetivo de avaliar conhecimentos técnicos e lógica de programação voltados à vaga de desenvolvedor.

---

## 📌 Descrição do Projeto

O projeto consiste em uma aplicação ASP.NET Web Forms com .NET Framework 4.8, focada na **manutenção de dados básicos de clientes**. A base do sistema foi fornecida pela empresa e estendida conforme os requisitos do teste.

---

## ✅ Funcionalidades Implementadas

### 1. Cadastro de CPF para Clientes
- Campo **CPF** adicionado na tela de cadastro/edição de clientes.
- Validação do CPF (formato e dígito verificador).
- Verificação de **duplicidade** de CPF no banco de dados.
- Campo **obrigatório** e com máscara de entrada (`999.999.999-99`).
- Alterações aplicadas tanto na interface quanto na estrutura da tabela `CLIENTES`.

### 2. Cadastro de Beneficiários
- Adição de um botão **"Beneficiários"** na tela de cliente.
- Abertura de pop-up (ou modal) para cadastrar beneficiários vinculados ao cliente.
- Cada beneficiário possui:
  - **CPF** (com validação e formatação)
  - **Nome**
- Um cliente **não pode ter dois beneficiários com o mesmo CPF**.
- Grid para exibição, edição e exclusão de beneficiários.
- Beneficiários salvos apenas ao clicar em "Salvar" no cadastro do cliente.
- Tabela `BENEFICIARIOS` criada com os campos `ID`, `CPF`, `NOME` e `IDCLIENTE`.

---

## 🛠️ Tecnologias Utilizadas

- **ASP.NET Web Forms**
- **.NET Framework 4.8**
- **Visual Studio 2022**
- **SQL Server Express 2019 LocalDB**
- **Bootstrap + jQuery** (para layout e interações)
