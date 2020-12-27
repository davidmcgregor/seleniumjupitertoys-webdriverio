import BaseComponent from './BaseComponent';

export default class Product<T> extends BaseComponent<T> {
    public getTitle(): string {
        return this.rootElement.$('.product-title').getText();
    }

    public getPrice(): number {
        return Number(this.rootElement.$('.product-price')
            .getText()
            .replace(new RegExp('[^0-9\\.]+'), ''));
    }

    public clickBuyButton(): Product<T> {
        this.rootElement.$('.btn').click();
        return this;
    }

    public getStars(): number {
        return Number(this.rootElement.$('.star-level').getText());
    }
}
