// @ts-ignore Playwright types are provided by the project dependencies at runtime.
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    // 1) Declaração dos locators (elementos da tela)
    readonly cmpUsuario: Locator;
    readonly cmpSenha: Locator;
    readonly btnLogin: Locator;
    readonly msgErro: Locator;

    // 2) Construtor: recebe a página e já localiza os elementos
    constructor(page: Page) {
        super(page)
        this.cmpUsuario = page.locator('#user-name');
        this.cmpSenha = page.locator('#password');
        this.btnLogin = page.locator('#login-button');
        this.msgErro = page.locator('[data-test="error"]');
    }
    // 3) Métodos de navegação
    async abrir() {
        await this.goto('/');
    }
    // 4) Métodos de ação 
    async logar(usuario: string, senha: string) {
        await this.cmpUsuario.fill(usuario);
        await this.cmpSenha.fill(senha);
        await this.btnLogin.click();
    }

    // 5) Métodos de validação
    // 5) Métodos de leitura (o que o teste vai verificar)
    async pegarMessagemErro(): Promise<string> {
        return (await this.msgErro.textContent()) ?? '';
    }

}