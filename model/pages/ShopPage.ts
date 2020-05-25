import Product from 'model/components/Product';
import BasePage from './BasePage';

export default class ShopPage extends BasePage {
    public getProduct(comparator: (p: Product) => boolean): Product {
        const product = $$('.product').map((element) => new Product(element))
            .find((product) => comparator(product));
        if (product) return product;
        throw `Product not found using: ${comparator}`;
    }

    public getProducts(comparator: (p: Product) => boolean): Array<Product> {
        return $$('.product').map((element) => new Product(element))
            .filter((product) => comparator(product));
    }
}
