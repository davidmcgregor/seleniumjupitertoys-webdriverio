/* eslint-disable @typescript-eslint/no-unsafe-return */

import {CartData} from '../../model/data';
import DataProvider from './DataProvider';

export default class CartDataProvider extends DataProvider<Array<CartData>> {
    public getData(): Array<CartData> {
        return this.getJsonData();
    }
    constructor(dataFile: string) {
        super(dataFile);
    }
}
