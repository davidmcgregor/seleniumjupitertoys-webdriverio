import {Element} from '@wdio/sync';

export default class LogoutDialog {
    private rootElement: Element

    constructor(rootElement: Element) {
        this.rootElement = rootElement;
    }

    public clickLogoutButton(): void {
        this.rootElement.$('.btn-success').click();
    }
}
