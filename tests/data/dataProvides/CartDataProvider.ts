import DataProvider from './DataProvider';

export default class CartDataProvider extends DataProvider<unknown> {
    constructor() {
        super();
        this.dataFile = 'cart_data.json';
    }
}
