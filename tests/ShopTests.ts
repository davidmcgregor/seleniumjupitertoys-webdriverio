import {suite, test} from '@testdeck/mocha';
import {HomePage, ShopPage} from 'model/pages';
import {expect} from 'chai';
import {Product} from 'model/compoenents';

@suite
export class ShopTests {
    @test
    'validate product price'(): void {
        const homePage: HomePage = new HomePage();
        homePage.clickShopMenu();
        const shopPage: ShopPage = new ShopPage();
        const product: Product = shopPage.getProduct((p) => p.getTitle() === 'Fluffy Bunny');

        expect(product.getPrice()).to.equal(8.99);
    }

    @test
    'validate products above minumum'(): void {
        const homePage: HomePage = new HomePage();
        homePage.clickShopMenu();
        const shopPage: ShopPage = new ShopPage();
        const products: Product[] = shopPage.getProducts((p) => p.getPrice() < 8.99);

        expect(products.length).to.equal(0);
    }

    @test
    'buy product with number of stars'(): void {
        const homePage: HomePage = new HomePage();
        homePage.clickShopMenu();
        const shopPage: ShopPage = new ShopPage();
        const product: Product = shopPage.getProduct((p) => p.getStars() === 5);
        product.clickBuyButton();

        expect(shopPage.getCartCount()).to.equal(1);
    }
}
