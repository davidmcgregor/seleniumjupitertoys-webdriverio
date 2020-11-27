/* eslint-disable @typescript-eslint/no-unsafe-return */

import * as fs from 'fs';
import * as path from 'path';

export default abstract class DataProvider<T> {
    protected dataFile: string;

    public getData(): T {
        const filePath = path.join(__dirname, `../../../resources/${this.dataFile}`);
        const value = fs.readFileSync(filePath).toString();
        return JSON.parse(value);
    }

    public withDataFile(fileName: string): DataProvider<T> {
        this.dataFile = fileName;
        return this;
    }
}
