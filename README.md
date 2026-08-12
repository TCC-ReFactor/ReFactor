# ReFactor

Este projeto foi gerado utilizando o [Angular CLI](https://github.com/angular/angular-cli) versão 21.2.20, e utiliza **TypeScript** como linguagem principal.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (recomenda-se a versão LTS mais recente)
- [npm](https://www.npmjs.com/) (já vem junto com o Node.js)
- [Git](https://git-scm.com/) (opcional, apenas se for clonar o repositório via terminal)

Para verificar se já possui o Node.js e o npm instalados, execute:

```bash
node -v
npm -v
```

## Obtendo o projeto

Você pode obter o projeto de duas formas:

### Opção 1 — Clonando o repositório com Git

```bash
git clone https://github.com/TCC-ReFactor/ReFactor.git
cd ReFactor
```

### Opção 2 — Baixando o arquivo .zip

1. Acesse o repositório em [https://github.com/TCC-ReFactor/ReFactor](https://github.com/TCC-ReFactor/ReFactor)
2. Clique no botão verde **Code**
3. Selecione **Download ZIP**
4. Extraia o arquivo `.zip` em uma pasta de sua preferência
5. Abra o terminal dentro dessa pasta (a que contém o arquivo `package.json`)

## Instalando as dependências

Com o projeto em mãos e o terminal aberto na raiz do repositório, instale todos os pacotes necessários com o comando:

```bash
npm install
```

Esse comando irá ler o arquivo `package.json` e instalar automaticamente todas as dependências do projeto (incluindo o Angular, o TypeScript e demais bibliotecas utilizadas), criando a pasta `node_modules`.

> Caso prefira uma instalação estritamente fiel às versões travadas no `package-lock.json`, utilize `npm ci` no lugar de `npm install`.

## Executando o projeto (servidor de desenvolvimento)

Após a instalação das dependências, inicie o servidor local de desenvolvimento com:

```bash
ng serve
```

ou, alternativamente, sem precisar do Angular CLI instalado globalmente:

```bash
npm start
```

Com o servidor em execução, abra o navegador e acesse:

```
http://localhost:4200/
```

A aplicação recarrega automaticamente sempre que algum arquivo do código-fonte é modificado.

## Scaffolding de código

O Angular CLI inclui ferramentas de scaffolding de código. Para gerar um novo componente, execute:

```bash
ng generate component nome-do-componente
```

Para ver a lista completa de opções disponíveis (como `components`, `directives` ou `pipes`), execute:

```bash
ng generate --help
```

## Build

Para compilar o projeto, execute:

```bash
ng build
```

Isso irá compilar o projeto e armazenar os artefatos de build no diretório `dist/`. Por padrão, o build de produção otimiza a aplicação para desempenho e velocidade.

## Recursos adicionais

Para mais informações sobre o uso do Angular CLI, incluindo referências detalhadas de comandos, visite a página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

## Licença

Este projeto está licenciado sob os termos da licença **GPL-3.0**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
