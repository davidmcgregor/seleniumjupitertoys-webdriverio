import {Element} from '@wdio/sync';

export default class LoginDialog {
    private rootElement: Element;

    constructor(rootElement: Element) {
        this.rootElement = rootElement;
    }

    public clickLoginButton(): void {
        this.rootElement.$('.btn-primary').click();
    }

    public clickAgreeCheckBox(): LoginDialog {
        this.rootElement.$('#agree').click();
        return this;
    }

    public setPassword(password: string): LoginDialog {
        this.rootElement.$('#loginPassword').setValue(password);
        return this;
    }

    public setUsername(username: string): LoginDialog {
        this.rootElement.$('#loginUserName').setValue(username);
        return this;
    }
}
