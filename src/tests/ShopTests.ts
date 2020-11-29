import {suite, test} from '@testdeck/mocha';
import {HomePage, ShopPage, open} from '../model/pages';
import {expect} from 'chai';
import {Product} from '../model/components';

@suite
export class ShopTests {
    @test
    'validate product price'(): void {
        expect(
            open(HomePage)
                .clickShopMenu()
                .getProduct(p => p.getTitle() === 'Fluffy Bunny')
                .getPrice()
        ).to.equal(8.99);
    }

    @test
    'validate products above minumum'(): void {
        expect(
            open(HomePage).clickShopMenu()
                .getProducts(p => p.getPrice() < 8.99)
                .length
        ).to.equal(0);
    }

    @test
    'buy product with number of stars'(): void {
        const shopPage: ShopPage = open(HomePage).clickShopMenu();
        shopPage.getProduct(p => p.getStars() === 5).clickBuyButton();

        expect(shopPage.getCartCount()).to.equal(1);
    }
}
