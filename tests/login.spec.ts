import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USUARIOS } from '../fixtures/users';

test.describe('Tela de Login - SauceDemo', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.abrir();
    });

    test('deve logar com credenciais válidas', async ({ page }) => {
        await loginPage.logar(USUARIOS.valido.usuario, USUARIOS.valido.senha);

        await expect(page).toHaveURL(/inventory\.html/);
    });

    test('não deve logar com credenciais inválidas', async () => {
        await loginPage.logar(USUARIOS.invalido.usuario, USUARIOS.invalido.senha);

        const erro = await loginPage.pegarMessagemErro();
        expect(erro).toContain('do not match');
    });

    test('deve bloquear usuário desativado', async () => {
        await loginPage.logar(USUARIOS.bloqueado.usuario, USUARIOS.bloqueado.senha);

        const erro = await loginPage.pegarMessagemErro();
        expect(erro).toContain('locked out');
    });
});