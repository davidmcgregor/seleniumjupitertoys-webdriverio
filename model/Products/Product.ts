import { Element } from "@wdio/sync";

export default class Product {
    private rootElement: Element;
    constructor(rootElement: Element) {
        this.rootElement = rootElement;
    }
    public getTitle(): string {
        return this.rootElement.$('.product-title').getText();
    }
    public getPrice(): number {
        const price: string = this.rootElement.$('.product-price').getText().replace(new RegExp('[^0-9\\.]+'),'');
        return Number(price);
    }
}