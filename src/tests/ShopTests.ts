import {suite, test} from '@testdeck/mocha';
import {HomePage, ShopPage, open} from '../model/pages';
import 'chai/register-should';

@suite
export class ShopTests {
    @test
    'validate product price'(): void {
        open(HomePage)
            .clickShopMenu()
            .getProduct(p => p.getTitle() === 'Fluffy Bunny')
            .getPrice()
            .should.equal(8.99);
    }

    @test
    'validate products above minumum'(): void {
        open(HomePage).clickShopMenu()
            .getProducts(p => p.getPrice() < 8.99)
            .length
            .should.equal(0);
    }

    @test
    'buy product with number of stars'(): void {
        const shopPage: ShopPage = open(HomePage).clickShopMenu();
        shopPage.getProduct(p => p.getStars() === 5).clickBuyButton();
        shopPage.getCartCount().should.equal(1);
    }
}
