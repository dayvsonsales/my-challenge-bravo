# <img src="https://avatars1.githubusercontent.com/u/7063040?v=4&s=200.jpg" alt="HU" width="24" /> Desafio Bravo

Construa uma API, que responda JSON, para conversão monetária. Ela deve ter uma moeda de lastro (USD) e fazer conversões entre diferentes moedas com cotações de verdade e atuais.

A API deve, originalmente, converter entre as seguintes moedas:

-   USD
-   BRL
-   EUR
-   BTC
-   ETH

Ex: USD para BRL, USD para BTC, ETH para BRL, etc...

A requisição deve receber como parâmetros: A moeda de origem, o valor a ser convertido e a moeda final.

Ex: `?from=BTC&to=EUR&amount=123.45`

Construa também um endpoint para adicionar e remover moedas suportadas pela API, usando os verbos HTTP.

Você pode usar qualquer linguagem de programação para o desafio. Abaixo a lista de linguagens que nós aqui do HU temos mais afinidade:

-   JavaScript (NodeJS)
-   Python
-   Go
-   Ruby
-   C++
-   PHP

## Solução

Utilizei Node.js com TypeScript, usando Express, TypeORM com PostgreSQL, Redis e Jest para os testes, para resolver o problema proposto. A arquitetura utilizada é baseada em microsserviços onde foi aplicado alguns padrões, como Circuit Breaker para lidar com as requisições externas.

A estrutura de pastas da aplicação é:

```
- src (código fonte da aplicação)
    - @types (tipos para uso com o TypeScript)
    - config (arquivos de configuração)
    - container (aqui fica o responsável pela injeção de dependência)
    - domain (definições de negócio)
    - errors (errors handlers)
    - infra (toda a parte de implementação que lida com requisições, banco de dados e requisições externas)
    - providers (interfaces dos provedores terceiros)
    - services (serviços)
- tests (testes unitários)

```

## Teste de estresse

Para rodar o teste de estresse foi utilizado o Artillery em um computador MacBook Air, rodando a aplicação. Este não é o melhor cenário, mas para fins de teste, a aplicação conseguiu suportar as 1000 requisições por segundo. O report está no arquivo ``stress_report``. Foi usando o comando ``artillery quick -r 1000 -n 1 http://localhost:3333/currencies/convert\?from\=USD\&to\=BRL\&amount\=2000``

## Testes unitários

Foi utilizado o Jest, para executá-los rode ``npm run test``.

## Uso

O jeito mais fácil de rodar a aplicação é utilizando o ``docker-compose``, dentro da pasta currency (após clonar o repositório), com o comando:

``docker-compose up --build`` ou ``docker-compose up``

Isso irá subir os containers necessários, já configurados com variáveis de ambiente. Caso necessário mudar, siga o .env.example e crie um .env na raiz do projeto ou altere o ``docker-compose.yaml``.

## Rotas

As rotas da API são: 

**Converter moedas**  

Recebe três query parameters: ``from``, ``to`` e ``amount``

``GET /currencies/convert?from={from}&to={to}&amount={amount}``

Retornará um objeto com as informações:

```
{
  "from": "USD",
  "to": "BRL",
  "bid": 5.1919,
  "ballast": "USD",
  "amountFrom": "2000",
  "resultTo": 10383.800000000001,
  "retrieveDate": "2021-01-03T13:02:44.614Z"
}

```

**Listar moedas cadastradas**

``GET /currencies``

Retornará uma lista de moedas cadastradas:

```
[
  {
    "id": "7711ac87-0988-48de-939b-b2cee974c57d",
    "name": "USD",
    "description": "North American Dollar",
    "created_at": "2021-01-03T16:02:12.381Z",
    "updated_at": "2021-01-03T16:02:12.381Z"
  },
  {
    "id": "14391403-f87f-4623-a3e8-c07d026f6b82",
    "name": "BRL",
    "description": "Brazilian Real",
    "created_at": "2021-01-03T16:02:12.381Z",
    "updated_at": "2021-01-03T16:02:12.381Z"
  },
]
```

**Cadastrar moeda**

``POST /currencies``

Recebe um JSON com as propriedades ``name`` e ``description``. Apenas o nome é obrigatório.

**Atualizar moeda**

``PUT /currencies/{id}``

Recebe um JSON com as propriedades ``name`` e ``description``, que deseja alterar.

**Remover moeda**

``DELETE /currencies/{id}``

Remove uma moeda dado um identificador dela.

## Requisitos

-   Forkar esse desafio e criar o seu projeto (ou workspace) usando a sua versão desse repositório, tão logo acabe o desafio, submeta um _pull request_.
    -   Caso você tenha algum motivo para não submeter um _pull request_, crie um repositório privado no Github, faça todo desafio na branch **master** e não se esqueça de preencher o arquivo `pull-request.txt`. Tão logo termine seu desenvolvimento, adicione como colaborador o usuário `automator-hurb` no seu repositório e o deixe disponível por pelo menos 30 dias. **Não adicione o `automator-hurb` antes do término do desenvolvimento.**
    -   Caso você tenha algum problema para criar o repositório privado, ao término do desafio preencha o arquivo chamado `pull-request.txt`, comprima a pasta do projeto - incluindo a pasta `.git` - e nos envie por email.
-   O código precisa rodar em macOS ou Ubuntu (preferencialmente como container Docker)
-   Para executar seu código, deve ser preciso apenas rodar os seguintes comandos:
    -   git clone \$seu-fork
    -   cd \$seu-fork
    -   comando para instalar dependências
    -   comando para executar a aplicação
-   A API pode ser escrita com ou sem a ajuda de _frameworks_
    -   Se optar por usar um _framework_ que resulte em _boilerplate code_, assinale no README qual pedaço de código foi escrito por você. Quanto mais código feito por você, mais conteúdo teremos para avaliar.
-   A API precisa suportar um volume de 1000 requisições por segundo em um teste de estresse.

## Critério de avaliação

-   **Organização do código**: Separação de módulos, view e model, back-end e front-end
-   **Clareza**: O README explica de forma resumida qual é o problema e como pode rodar a aplicação?
-   **Assertividade**: A aplicação está fazendo o que é esperado? Se tem algo faltando, o README explica o porquê?
-   **Legibilidade do código** (incluindo comentários)
-   **Segurança**: Existe alguma vulnerabilidade clara?
-   **Cobertura de testes** (Não esperamos cobertura completa)
-   **Histórico de commits** (estrutura e qualidade)
-   **UX**: A interface é de fácil uso e auto-explicativa? A API é intuitiva?
-   **Escolhas técnicas**: A escolha das bibliotecas, banco de dados, arquitetura, etc, é a melhor escolha para a aplicação?

## Dúvidas

Quaisquer dúvidas que você venha a ter, consulte as [_issues_](https://github.com/HurbCom/challenge-bravo/issues) para ver se alguém já não a fez e caso você não ache sua resposta, abra você mesmo uma nova issue!

Boa sorte e boa viagem! ;)

<p align="center">
  <img src="ca.jpg" alt="Challange accepted" />
</p>
