import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProdutosPage extends BasePage {
    // 1) Declaração dos locators (elementos da tela)
    readonly tituloBackpack: Locator;
    readonly tituloBikeLight: Locator;
    readonly tituloBoltTShirt: Locator;
    readonly precoBackpack: Locator;
    readonly precoBikeLight: Locator;
    readonly precoBoltTShirt: Locator
    readonly botaoAddToCart: Locator;
    readonly botaoRemoveFromCart: Locator;
    readonly botaoLogout: Locator;
    readonly menuHamburger: Locator;

    // 2) Construtor: recebe a página e já localiza os elementos
    constructor(page: Page) {
        super(page)
        this.tituloBackpack = page.locator('//*[@id="item_4_title_link"]/div');
        this.tituloBikeLight = page.locator('//*[@id="item_0_title_link"]/div');
        this.tituloBoltTShirt = page.locator('//*[@id="item_1_title_link"]/div');
        this.precoBackpack = page.getByText('$29.99');
        this.precoBikeLight = page.getByText('$9.99');
        this.precoBoltTShirt = page.getByText('$15.99');
        this.botaoAddToCart = page.locator('//*[@id="add-to-cart-sauce-labs-backpack"]');
        this.botaoRemoveFromCart = page.locator('//*[@id="remove-sauce-labs-backpack"]');
        this.botaoLogout = page.locator('#logout_sidebar_link');
        this.menuHamburger = page.getByRole('button', { name: 'Open Menu' });
    }

    async adicionarAoCarrinho() {
        await this.botaoAddToCart.click();
    }

    async validarProdutoAdicionadoAoCarrinho() {
        const carrinho = this.page.locator('.shopping_cart_link');
        await expect(carrinho).toHaveText('1');
    }

    async removerProdutoDoCarrinho() {
        await this.botaoRemoveFromCart.click();
    }

    async validarCarrinhoVazio() {
        const carrinho = this.page.locator('.shopping_cart_link');
        await expect(carrinho).toBeEmpty();
    }

    async ordenarPorNomeAZ() {
        const selectOrdenacao = this.page.locator('.product_sort_container');
        await selectOrdenacao.selectOption('az');
    }

    async validarOrdenacaoPorNomeAZ() {
        const titulosProdutos = await this.page.locator('.inventory_item_name').allTextContents();
        const titulosOrdenados = [...titulosProdutos].sort();
        expect(titulosProdutos).toEqual(titulosOrdenados);
    }

    async ordenarPreçoMaiorMenor() {
        const selectOrdenacao = this.page.locator('.product_sort_container');
        await selectOrdenacao.selectOption('hilo');
    }

    async validarOrdenacaoPorPreçoMaiorMenor() {
        const precosProdutos = await this.page.locator('.inventory_item_price').allTextContents();
        const precosNumericos = precosProdutos.map(preco => parseFloat(preco.replace('$', '')));
        const precosOrdenados = [...precosNumericos].sort((a, b) => b - a);
        expect(precosNumericos).toEqual(precosOrdenados);
    }

    async logout() {
        await this.menuHamburger.click();
        await this.botaoLogout.click();
    }

    async validarUsuarioDeslogado() {
        await expect(this.tituloBackpack).not.toBeVisible();
    }

}