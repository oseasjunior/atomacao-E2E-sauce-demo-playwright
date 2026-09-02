# Automacao SauceDemo com Playwright

Suíte de testes end-to-end para validar o fluxo de login da aplicação [SauceDemo](https://www.saucedemo.com), usando Playwright, TypeScript e o padrão Page Object Model.

## Pré-requisitos

- Node.js 20 ou superior
- npm

## Instalação

Clone o repositório, acesse a pasta do projeto e instale as dependências:

```bash
npm ci
npx playwright install
```

No Linux usado em ambientes de CI, instale também as dependências do sistema:

```bash
npx playwright install --with-deps
```

## Executando os testes

Execute toda a suíte nos navegadores configurados:

```bash
npx playwright test
```

Outros comandos úteis:

```bash
# Executa os testes com a interface visual do Playwright
npx playwright test --ui

# Executa em modo visível
npx playwright test --headed

# Executa apenas um arquivo
npx playwright test tests/login.spec.ts

# Executa apenas em um navegador
npx playwright test --project=chromium

# Abre o relatório HTML gerado pela última execução
npx playwright show-report
```

A suíte está configurada para executar em Chromium, Firefox e WebKit. Em execuções locais, os testes não são repetidos automaticamente; no CI, há até duas tentativas para testes que falharem.

## Cenários cobertos

- Login com o usuário válido `standard_user`
- Bloqueio do usuário `locked_out_user`
- Mensagem de erro para credenciais inválidas
- Redirecionamento para `inventory.html` após login válido

Os usuários de teste ficam centralizados em `fixtures/users.ts`.

## Estrutura do projeto

```text
├── fixtures/
│   └── users.ts             # Dados dos usuários usados nos cenários
├── pages/
│   ├── BasePage.ts          # Comportamentos comuns de páginas
│   └── LoginPage.ts         # Locators e ações da tela de login
├── tests/
│   └── login.spec.ts        # Casos de teste do login
├── playwright.config.ts     # Configuração da suíte e dos navegadores
└── package.json             # Dependências do projeto
```

## Configuração

A URL base está definida em `playwright.config.ts`:

```text
https://www.saucedemo.com
```

A configuração também habilita:

- Relatório HTML
- Screenshot somente em caso de falha
- Vídeo somente em caso de falha
- Trace na primeira repetição no CI
- Execução paralela dos testes do mesmo arquivo

## Integração contínua

O workflow `.github/workflows/playwright.yml` é executado em pushes e pull requests direcionados às branches `main` e `master`. Ele instala as dependências, instala os navegadores, executa os testes e publica o diretório `playwright-report/` como artefato por 30 dias.

## Diagnóstico de falhas

Quando um teste falhar, consulte o relatório HTML:

```bash
npx playwright show-report
```

Os artefatos de execução, relatórios e evidências de falha são gerados localmente nos diretórios ignorados pelo Git, como `playwright-report/` e `test-results/`.
