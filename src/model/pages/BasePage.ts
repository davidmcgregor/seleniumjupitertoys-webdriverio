import {LoginDialog, LogoutDialog} from '../dialogs';
import {ContactPage, ShopPage, CartPage} from '.';

export default abstract class BasePage {
    public clickContactMenu(): ContactPage {
        $('#nav-contact a').click();
        return new ContactPage();
    }

    public clickShopMenu(): ShopPage {
        $('#nav-shop a').click();
        return new ShopPage();
    }

    public clickCartMenu(): CartPage {
        $('#nav-cart a').click();
        return new CartPage();
    }

    public clickLoginMenu(): LoginDialog<this> {
        $('#nav-login a').click();
        return new LoginDialog($('.popup'), this);
    }

    public clickLogoutMenu(): LogoutDialog<this> {
        $('#nav-logout a').click();
        return new LogoutDialog($('.popup'), this);
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
