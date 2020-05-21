import { suite, test } from '@testdeck/mocha'
import { expect } from 'chai'
import { HomePage, ContactPage } from 'model/pages';



@suite
export class ContactTests {
    
    @test
    'validate mandatory errors'(): void {
        const homePage: HomePage = new HomePage();
        homePage.clickContactMenu();
        const contactPage: ContactPage = new ContactPage();
        contactPage.clickSubmitButton();
        expect(contactPage.getForenameError()).to.equal('Forename is required');
        expect(contactPage.getEmailError()).to.equal('Email is required');
        expect(contactPage.getMessageError()).to.equal('Message is required');
    }

}