/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {suite, test, params} from '@testdeck/mocha';
import {CartPage, HomePage, ShopPage} from 'model/pages';
import {Product} from 'model/components';
import {CartDataProvider, MultipleCartDataProvider} from './dataProviders';
import {open} from 'model/pages';
import {CartData} from 'model/data';
import 'chai/register-should';

@suite
export class CartTests {
    @test
    'validate price in cart page'(): void {
        const product: Product = open(HomePage)
            .clickShopMenu()
            .getProduct((p) => p.getTitle() === 'Fluffy Bunny').clickBuyButton();
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

    @params(new CartDataProvider('cart_data.json').getData())
    @params.naming((cartData: CartData[]) => `validate ${cartData.flatMap(entry => `${entry.title} X ${entry.count}`).join()} in cart`)
    'validate multiple items cart'(cartData: CartData[]): void {
        const shopPage: ShopPage = open(HomePage).clickShopMenu();
        cartData.forEach(cartItem => {
            const product: Product = shopPage.getProduct(p => p.getTitle() === cartItem.title);
            [...Array(cartItem.count).keys()].forEach(() => product.clickBuyButton());
        });

        const cartPage: CartPage = shopPage.clickCartMenu();
        let total = 0;
        cartData.forEach(cartItem => {
            (cartPage.getPrice(cartItem.title) * cartPage.getQuantity(cartItem.title)).should.equal(cartPage.getSubtotal(cartItem.title));
            total += cartPage.getSubtotal(cartItem.title);
        });
        cartPage.getTotal().should.equal(total);
    }
}

/**
 * This is an example on how to run a test multiple times from a data source
 */
const cartDataArray: CartData[][] = new MultipleCartDataProvider('multiple_cart_data.json').getData();
cartDataArray.forEach((cartData: CartData[]) => {
    @suite
    class DataDrivenCartTests {
        @params(cartData)
        @params.naming((cartData: CartData[]) => `validate ${cartData.flatMap(entry => `${entry.title} X ${entry.count}`).join()} in cart`)
        'validate multiple items cart with multiple tests'(cartData: CartData[]): void {
            const shopPage: ShopPage = open(HomePage).clickShopMenu();
            cartData.forEach(cartItem => {
                const product: Product = shopPage.getProduct(p => p.getTitle() === cartItem.title);
                [...Array(cartItem.count).keys()].forEach(() => product.clickBuyButton());
            });
            
            const cartPage: CartPage = shopPage.clickCartMenu();
            let total = 0;
            cartData.forEach(cartItem => {
                (cartPage.getPrice(cartItem.title) * cartPage.getQuantity(cartItem.title)).should.equal(cartPage.getSubtotal(cartItem.title));
                total += cartPage.getSubtotal(cartItem.title);
            });
            cartPage.getTotal().should.equal(total);
        }
    }
});
