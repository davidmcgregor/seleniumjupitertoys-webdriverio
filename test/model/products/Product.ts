import { Element } from "@wdio/sync";

export class Product {

    element: Element;

    constructor(element: Element) {
        this.element = element;
    }

    public getTitle(): string {
        return this.element.$('.product-title').getText();
    }

    public getPrice(): number {
        return Number.parseFloat(this.element.$('.product-price').getText().replace('$',''));
    }
}