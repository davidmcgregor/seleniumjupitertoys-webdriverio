import Product from 'model/components/Product';
import BasePage from './BasePage';

export default class ShopPage extends BasePage {
    public getProduct(comparator: (p: Product) => boolean): Product {
        const product = this.getProducts(comparator)[0];
        if (product) return product;
        else throw `Product not found using: ${comparator}`;
    }

    public getProducts(comparator: (p: Product) => boolean): Array<Product> {
        return $$('.product').map((element) => new Product(element))
            .filter((product) => comparator(product));
    }
}
