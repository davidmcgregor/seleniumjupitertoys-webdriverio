/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as fs from 'fs';
import * as path from 'path';

export default abstract class DataProvider<T> {
    protected dataFile: string;
    
    protected getJsonData(): any {
        const filePath = path.join(__dirname, `../../resources/${this.dataFile}`);
        const value = fs.readFileSync(filePath).toString();
        return JSON.parse(value);
    }

    constructor(dataFile: string) {
        this.dataFile = dataFile;
    }

    public abstract getData(): T;
}
