import {Element} from '@wdio/sync';
import {LoginData} from '../data';
import BasePage from '../pages/BasePage';

export default class LoginDialog<T extends BasePage> {
    private rootElement: Element;
    private parent: T 

    constructor(rootElement: Element, parent: T) {
        this.rootElement = rootElement;
        this.parent = parent;
    }

    public clickLoginButton(): T {
        this.rootElement.$('.btn-primary').click();
        return this.parent;
    }

    public clickAgreeCheckBox(): LoginDialog<T> {
        this.rootElement.$('#agree').click();
        return this;
    }

    public setPassword(password: string): LoginDialog<T> {
        this.rootElement.$('#loginPassword').setValue(password);
        return this;
    }

    public setUsername(username: string): LoginDialog<T> {
        this.rootElement.$('#loginUserName').setValue(username);
        return this;
    }

    public login(loginData: LoginData): T {
        return this.setUsername(loginData.username)
            .setPassword(loginData.password)
            .clickAgreeCheckBox()
            .clickLoginButton();
    }
}
