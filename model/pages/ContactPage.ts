import {ElementArray, Element} from '@wdio/sync';
import BasePage from './BasePage';

export default class ContactPage extends BasePage {
    public getSuccessMessage(): string {
        const element: Element = $('.alert-success');
        element.waitForDisplayed();
        return element.getText();
    }

    public setMessage(message: string): ContactPage {
        $('#message').setValue(message);
        return this;
    }

    public setEmail(email: string): ContactPage {
        $('#email').setValue(email);
        return this;
    }

    public setForename(forename: string): ContactPage {
        $('#forename').setValue(forename);
        return this;
    }

    public getForenameError(): string {
        return this.getErrorText('#forename-err');
    }

    public getEmailError(): string {
        return this.getErrorText('#email-err');
    }

    public getMessageError(): string {
        return this.getErrorText('#message-err');
    }

    public clickSubmitButton(): ContactPage {
        $('.btn-primary').click();
        return this;
    }

    private getErrorText(locator: string): string {
        const errors: ElementArray = $$(locator);
        if (errors.length === 0) {
            return '';
        }
        return errors[0].getText();
    }
}
