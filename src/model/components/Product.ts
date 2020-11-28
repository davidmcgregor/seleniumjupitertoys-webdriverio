import {Element} from '@wdio/sync';

export default class Product {
    private rootElement: Element;

    constructor(rootElement: Element) {
        this.rootElement = rootElement;
    }

    public getTitle(): string {
        return this.rootElement.$('.product-title').getText();
    }

    public getPrice(): number {
        return Number(this.rootElement.$('.product-price')
            .getText()
            .replace(new RegExp('[^0-9\\.]+'), ''));
    }

    public clickBuyButton(): Product {
        this.rootElement.$('.btn').click();
        return this;
    }

    public getStars(): number {
        return Number(this.rootElement.$('.star-level').getText());
    }
}
