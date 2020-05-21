import BasePage from "./BasePage";
import Product from "model/Products/Product";

export default class ShopPage extends BasePage {
    public getProduct(comparator: (p: Product) => boolean): Product {
        return $$('.product').map(element => new Product(element))
                             .find(product => comparator(product));
    }
}