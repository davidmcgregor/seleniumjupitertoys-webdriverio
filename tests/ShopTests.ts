import { suite, test } from '@testdeck/mocha'
import { HomePage, ShopPage } from 'model/pages'
import { expect } from 'chai'
import Product from 'model/Products/Product';

@suite
export class ShopTests {
    @test
    'verify porduct price'(): void {
        const homePage: HomePage = new HomePage();
        homePage.clickShopMenu();
        const shopPage: ShopPage = new ShopPage();
        const product: Product = shopPage.getProduct(p => p.getTitle()==='Teddy Bear');
        expect(product.getPrice()).to.equal(12.99);
    }
}