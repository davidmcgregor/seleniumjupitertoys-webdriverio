import {LoginDialog, LogoutDialog} from 'model/dialogs';

export default abstract class BasePage {
    public clickContactMenu(): void {
        $('#nav-contact a').click();
    }

    public clickShopMenu(): void {
        $('#nav-shop a').click();
    }

    public clickLoginMenu(): LoginDialog {
        $('#nav-login a').click();
        return new LoginDialog($('.popup'));
    }

    public clickLogoutMenu(): LogoutDialog {
        $('#nav-logout a').click();
        return new LogoutDialog($('.popup'));
    }

    public getCartCount(): number {
        return Number($('.cart-count').getText());
    }

    public getUser(): string {
        const userElement = $$('.user');
        if (userElement.length === 0) return '';
        return userElement[0].getText();
    }
}
