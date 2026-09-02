import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USUARIOS } from './users';



type Fixtures = {
    usuarioLogado: void;
};

export const test = base.extend<Fixtures>({
    usuarioLogado: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.abrir();
        await loginPage.logar(USUARIOS.valido.usuario, USUARIOS.valido.senha);
        await use();
    },

});

export { expect };