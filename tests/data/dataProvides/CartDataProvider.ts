import DataProvider from './DataProvider';

export default class CartDataProvider<T> extends DataProvider<T> {
    constructor(dataFile: string) {
        super();
        this.dataFile = dataFile;
    }
}
