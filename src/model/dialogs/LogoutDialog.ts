import {Element} from '@wdio/sync';
import BasePage from '../pages/BasePage';

export default class LogoutDialog<T extends BasePage> {
    private rootElement: Element
    private parent: T 

    constructor(rootElement: Element, parent: T) {
        this.rootElement = rootElement;
        this.parent = parent;
    }

    public clickLogoutButton(): T {
        this.rootElement.$('.btn-success').click();
        return this.parent;
    }
}
