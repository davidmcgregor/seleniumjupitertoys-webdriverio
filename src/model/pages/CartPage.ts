import BasePage from './BasePage';
import {Table} from '../components/ui';

export default class CartPage extends BasePage {
    private getTable(): Table {
        return new Table($('.cart-items'));
    }

    public getTotal(): number {
        return Number($('.total').getText().replace(new RegExp('[^0-9\\.]+'), ''));
    }

    public getSubtotal(productName: string): number {
        return Number(this.getTable().getValue('Item', productName, 'Subtotal')
            .getText().replace(new RegExp('[^0-9\\.]+'), ''));
    }

    public getQuantity(productName: string): number {
        const element = this.getTable().getValue('Item', productName, 'Quantity');
        return Number(element.$('input').getValue());
    }

    public getPrice(productName: string): number {
        return Number(this.getTable().getValue('Item', productName, 'Price')
            .getText().replace(new RegExp('[^0-9\\.]+'), ''));
    }
}
