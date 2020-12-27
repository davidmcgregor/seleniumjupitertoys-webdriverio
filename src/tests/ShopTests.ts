import {suite, test} from '@testdeck/mocha';
import {HomePage, open} from '../model/pages';
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
        open(HomePage)
            .clickShopMenu()
            .getProduct(p => p.getStars() === 5)
            .clickBuyButton()
            .parent
            .getCartCount().should.equal(1);
    }
}
