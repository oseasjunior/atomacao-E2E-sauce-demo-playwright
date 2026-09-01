import { from } from "node:stream/iter";
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Pasta onde ficam os arquivos de teste (.spec.ts)
  testDir: './tests',
  // Roda os testes de um mesmo arquivo em paralelo
  fullyParallel: true,
  // Impede que um test.only esquecido passe direto no CI
  forbidOnly: !!process.env.CI,
  // Tenta novamente os testes que falharem, só em CI
  retries: process.env.CI ? 2 : 0,
  // Quantidade de processos rodando em paralelo
  workers: process.env.CI ? 1 : undefined,
  // Formato do relatório final
  reporter: 'html',
  use: {
    // URL base do projeto
    baseURL: 'https://www.saucedemo.com',

    // Trace (gravação interativa) na primeira vez que um teste falhar e repetir
    trace: 'on-first-retry',

    // Screenshot só quando o teste falha
    screenshot: 'only-on-failure',

    // Vídeo só quando o teste falha
    video: 'retain-on-failure',
  },

  // Navegadores em que a suíte inteira vai rodar
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
