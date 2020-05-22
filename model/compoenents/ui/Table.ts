import {Element} from '@wdio/sync';

export default class Table {
    private rootElement: Element;

    constructor(rootElement: Element) {
        this.rootElement = rootElement;
    }

    private getColumnIndex(columnText: string): number {
        const columns: Element[] = this.rootElement.$$('th');
        const columnIndex: number = columns.findIndex((e) => e.getText()===columnText);
        if (columnIndex < 0) throw `column ${columnText} not found`;
        else return columnIndex;
    }

    public getValue(searchColumn: string, searchValue: string, returnColumn: string): Element {
        const searchColumnIndex: number = this.getColumnIndex(searchColumn);
        const returnColumnIndex: number = this.getColumnIndex(returnColumn);
        const searchElement: Element = this.rootElement.$$('tbody tr')
            .map((row) => row.$$('td'))
            .filter((values) => values[searchColumnIndex].getText()===searchValue)
            .map((value)=>value[returnColumnIndex])[0];
        if (searchElement === undefined) throw `Element at serach col: ${searchColumn}, search value: ${searchValue}, return col: ${returnColumn} not found`;
        else return searchElement;
    }
}
