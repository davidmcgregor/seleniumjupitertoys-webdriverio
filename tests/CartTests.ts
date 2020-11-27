/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {suite, test, params} from '@testdeck/mocha';
import {expect} from 'chai';
import {CartPage, HomePage, ShopPage} from 'model/pages';
import {Product} from 'model/components';
import {CartDataProvider} from './data/dataProvides';
import {open} from 'model/pages';
import {CartData} from 'model/data';

@suite
export class CartTests {
    @test
    'validate price in cart page'(): void {
        const product: Product = open(HomePage)
            .clickShopMenu()
            .getProduct((p) => p.getTitle() === 'Fluffy Bunny');
        const price: number = product.getPrice();
        const title: string = product.getTitle();
        product.clickBuyButton();
        const cartPage: CartPage = open(ShopPage).clickCartMenu();

        expect(cartPage.getPrice(title)).to.equal(price);
    }

    @test
    'validate cart calculations'(): void {
        const shopPage: ShopPage = open(HomePage).clickShopMenu();

        let product: Product = shopPage.getProduct(p => p.getTitle() === 'Fluffy Bunny');
        const bunnyTitle: string = product.getTitle();
        product.clickBuyButton().clickBuyButton();

        product = shopPage.getProduct(p => p.getTitle() === 'Stuffed Frog');
        const frogTitle: string = product.getTitle();
        product.clickBuyButton().clickBuyButton();

        shopPage.clickCartMenu();
        const cartPage: CartPage = new CartPage();

        expect(cartPage.getPrice(bunnyTitle) * cartPage.getQuantity(bunnyTitle)).to.equal(cartPage.getSubtotal(bunnyTitle));
        expect(cartPage.getSubtotal(bunnyTitle) + cartPage.getSubtotal(frogTitle)).to.equal(cartPage.getTotal());
    }

    @params(new CartDataProvider<CartData[]>('cart_data.json').getData())
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
            expect(cartPage.getPrice(cartItem.title) * cartPage.getQuantity(cartItem.title)).to.equal(cartPage.getSubtotal(cartItem.title));
            total += cartPage.getSubtotal(cartItem.title);
        });
        expect(cartPage.getTotal()).to.equal(total);
    }
}

/**
 * This is an example on how to run a test multiple times from a data source
 */
const cartDataArray: CartData[][] = new CartDataProvider<CartData[][]>('multiple_cart_data.json').getData();
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
                expect(cartPage.getPrice(cartItem.title) * cartPage.getQuantity(cartItem.title)).to.equal(cartPage.getSubtotal(cartItem.title));
                total += cartPage.getSubtotal(cartItem.title);
            });
            expect(cartPage.getTotal()).to.equal(total);
        }
    }
});
