import {ElementArray} from '@wdio/sync';
import {ContactData} from '../data';
import BasePage from './BasePage';

export default class ContactPage extends BasePage {
    public getSuccessMessage(): string {
        browser.waitUntil(() => $('.alert-success').isDisplayed(), {timeout: 60000});
        return $('.alert-success').getText();
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

    public setLastname(lastname: string): ContactPage {
        $('#lastname').setValue(lastname);
        return this;
    }

    public setTelephone(telephone: string): ContactPage {
        $('#telephone').setValue(telephone);
        return this;
    }

    public setContactData(contactData: ContactData): ContactPage {
        if (contactData.forename !== undefined) this.setForename(contactData.forename);
        if (contactData.lastname !== undefined) this.setLastname(contactData.lastname);
        if (contactData.email !== undefined) this.setEmail(contactData.email);
        if (contactData.telephone !== undefined) this.setTelephone(contactData.telephone);
        if (contactData.message !== undefined) this.setMessage(contactData.message);
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
