/* eslint-disable @typescript-eslint/restrict-template-expressions */

import {Product} from '../components';
import BasePage from './BasePage';

export default class ShopPage extends BasePage {
    public getProduct(comparator: (p: Product<ShopPage>) => boolean): Product<ShopPage> {
        const product = this.getProducts(comparator)[0];
        if (product) return product;
        else throw `Product not found using: ${comparator}`;
    }

    public getProducts(comparator: (p: Product<ShopPage>) => boolean): Array<Product<ShopPage>> {
        return $$('.product').map((element) => new Product(element, this))
            .filter(product => comparator(product));
    }
}
