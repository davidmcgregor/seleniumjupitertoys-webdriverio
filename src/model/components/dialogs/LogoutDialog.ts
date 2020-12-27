import BasePage from '../../pages/BasePage';
import BaseComponent from '../BaseComponent';

export default class LogoutDialog<T extends BasePage> extends BaseComponent<T> {
    public clickLogoutButton(): T {
        this.rootElement.$('.btn-success').click();
        return this.parent;
    }
}
