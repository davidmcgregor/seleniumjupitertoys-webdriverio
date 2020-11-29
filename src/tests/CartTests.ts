/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {suite, test} from '@testdeck/mocha';
import {CartPage, HomePage, ShopPage} from '../model/pages';
import {Product} from '../model/components';
import {open} from '../model/pages';
import 'chai/register-should';

@suite
export class CartTests {
    @test
    'validate price in cart page'(): void {
        const product: Product = open(HomePage)
            .clickShopMenu()
            .getProduct(p => p.getTitle() === 'Fluffy Bunny').clickBuyButton();
        const price: number = product.getPrice();
        const title: string = product.getTitle();
        const cartPage: CartPage = open(ShopPage).clickCartMenu();

        cartPage.getPrice(title).should.equal(price);
    }

    @test
    'validate cart calculations'(): void {
        const shopPage: ShopPage = open(HomePage).clickShopMenu();

        let product: Product = shopPage.getProduct(p => p.getTitle() === 'Fluffy Bunny').clickBuyButton().clickBuyButton();
        const bunnyTitle: string = product.getTitle();

        product = shopPage.getProduct(p => p.getTitle() === 'Stuffed Frog').clickBuyButton().clickBuyButton();
        const frogTitle: string = product.getTitle();

        const cartPage: CartPage = shopPage.clickCartMenu();

        (cartPage.getPrice(bunnyTitle) * cartPage.getQuantity(bunnyTitle)).should.equal(cartPage.getSubtotal(bunnyTitle));
        (cartPage.getSubtotal(bunnyTitle) + cartPage.getSubtotal(frogTitle)).should.equal(cartPage.getTotal());
    }
}
