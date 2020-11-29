import {suite, test} from '@testdeck/mocha';
import {CartPage, HomePage, ShopPage} from '../model/pages';
import {open} from '../model/pages';
import 'chai/register-should';

@suite
export class CartTests {
    @test
    'validate price in cart page'(): void {
        const shopPage: ShopPage = open(HomePage).clickShopMenu();
        const price: number = shopPage
            .getProduct(p => p.getTitle() === 'Fluffy Bunny')
            .clickBuyButton()
            .getPrice();

        shopPage.clickCartMenu().getPrice('Fluffy Bunny').should.equal(price);
    }

    @test
    'validate cart calculations'(): void {
        const shopPage: ShopPage = open(HomePage).clickShopMenu();
        shopPage.getProduct(p => p.getTitle() === 'Fluffy Bunny').clickBuyButton().clickBuyButton();
        shopPage.getProduct(p => p.getTitle() === 'Stuffed Frog').clickBuyButton().clickBuyButton();
        const cartPage: CartPage = shopPage.clickCartMenu();

        (cartPage.getPrice('Fluffy Bunny') * cartPage.getQuantity('Fluffy Bunny')).should.equal(cartPage.getSubtotal('Fluffy Bunny'));
        (cartPage.getSubtotal('Fluffy Bunny') + cartPage.getSubtotal('Stuffed Frog')).should.equal(cartPage.getTotal());
    }
}
