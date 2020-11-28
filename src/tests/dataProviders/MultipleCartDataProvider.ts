/* eslint-disable @typescript-eslint/no-unsafe-return */

import {CartData} from '../../model/data';
import DataProvider from './DataProvider';

export default class MultipleCartDataProvider extends DataProvider<Array<Array<CartData>>> {
    public getData(): Array<Array<CartData>> {
        return this.getJsonData();
    }
    constructor(dataFile: string) {
        super(dataFile);
    }
}
