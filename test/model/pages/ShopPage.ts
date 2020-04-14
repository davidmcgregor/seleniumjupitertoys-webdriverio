import { BasePage } from "./BasePage";
import { Product } from "../products/Product";

export class ShopPage extends BasePage {
    getProduct(comparator: (p: Product) => boolean): Product {
        return $$('.product').map(element=>new Product(element)).find(product=>comparator(product))
    }
}