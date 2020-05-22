import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';
import {CartPage, HomePage, ShopPage} from 'model/pages';
import {Product} from 'model/compoenents';

@suite
export class CartTests {
    @test
    'validate price in cart page'(): void {
        const homePage: HomePage = new HomePage();
        homePage.clickShopMenu();
        const shopPage: ShopPage = new ShopPage();
        const product: Product = shopPage.getProduct((p) => p.getTitle() === 'Fluffy Bunny');
        const price: number = product.getPrice();
        const title: string = product.getTitle();
        product.clickBuyButton();
        shopPage.clickCartMenu();
        const cartPage: CartPage = new CartPage();
        
        expect(cartPage.getPrice(title)).to.equal(price);
    }

    @test
    'validate cart calculations'(): void {
        const homePage: HomePage = new HomePage();
        homePage.clickShopMenu();
        const shopPage: ShopPage = new ShopPage();
        let product: Product = shopPage.getProduct((p) => p.getTitle() === 'Fluffy Bunny');
        const bunnyTitle: string = product.getTitle();
        product.clickBuyButton().clickBuyButton();
        product = shopPage.getProduct((p) => p.getTitle() === 'Stuffed Frog');
        const frogTitle: string = product.getTitle();
        product.clickBuyButton().clickBuyButton();
        shopPage.clickCartMenu();
        const cartPage: CartPage = new CartPage();

        expect(cartPage.getPrice(bunnyTitle)*cartPage.getQuantity(bunnyTitle)).to.equal(cartPage.getSubtotal(bunnyTitle));
        expect(cartPage.getSubtotal(bunnyTitle)+cartPage.getSubtotal(frogTitle)).to.equal(cartPage.getTotal());
    }
}
