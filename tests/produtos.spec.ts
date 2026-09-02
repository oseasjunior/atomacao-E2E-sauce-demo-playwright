import { test, expect } from '../fixtures/test';
import { BACKPACK } from '../fixtures/users';
import { ProdutosPage } from '../pages/ProdutosPage';

test.describe('Produtos - SauceDemo', () => {
    let produtosPage: ProdutosPage;

    test.beforeEach(async ({ page, usuarioLogado }) => {
        void usuarioLogado;

        produtosPage = new ProdutosPage(page);
    });

    test('Validar o título do Backpack', async ({ page }) => {
        await expect(page).toHaveURL(/inventory\.html/);
        await expect(produtosPage.tituloBackpack).toHaveText(BACKPACK.titulo);
        await expect(produtosPage.precoBackpack).toHaveText(BACKPACK.preco);
    });

    test('Adicionar um produto ao carrinho', async ({ page }) => {
        await expect(page).toHaveURL(/inventory\.html/);
        await produtosPage.adicionarAoCarrinho();
        await produtosPage.validarProdutoAdicionadoAoCarrinho();
    });

    test('Remover um produto do carrinho', async ({ page }) => {
        await expect(page).toHaveURL(/inventory\.html/);
        await produtosPage.adicionarAoCarrinho();
        await produtosPage.validarProdutoAdicionadoAoCarrinho();
        await produtosPage.removerProdutoDoCarrinho();
        await produtosPage.validarCarrinhoVazio();
    });

    test('Abrir o carrinho sem itens', async ({ page }) => {
        await expect(page).toHaveURL(/inventory\.html/);
        await produtosPage.validarCarrinhoVazio();
    });

    test('Ordenar por nome, A–Z', async ({ page }) => {
        await expect(page).toHaveURL(/inventory\.html/);
        await produtosPage.ordenarPorNomeAZ();
        await produtosPage.validarOrdenacaoPorNomeAZ();
    });

    test('Ordenar por preço, Maior–Menor', async ({ page }) => {
        await expect(page).toHaveURL(/inventory\.html/);
        await produtosPage.ordenarPreçoMaiorMenor();
        await produtosPage.validarOrdenacaoPorPreçoMaiorMenor();
    });
    test('Logout do usuário', async ({ page }) => {
        await expect(page).toHaveURL(/inventory\.html/);
        await produtosPage.logout();
        await produtosPage.validarUsuarioDeslogado();
    });
});