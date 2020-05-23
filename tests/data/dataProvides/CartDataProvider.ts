import DataProvider from './DataProvider';

export default class CartDataProvider extends DataProvider<object> {
    constructor() {
        super();
        this.dataFile = 'cart_data.json';
    }
}
