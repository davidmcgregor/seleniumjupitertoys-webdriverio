import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';
import {HomePage, ContactPage} from 'model/pages';

@suite
export class ContactTests {
    @test
    'validate mandatory errors'(): void {
        const homePage: HomePage = new HomePage();
        homePage.clickContactMenu();
        const contactPage: ContactPage = new ContactPage();
        contactPage.clickSubmitButton();
        
        contactPage.getForenameError().should.equal('Forename is required');
        expect(contactPage.getForenameError()).to.equal('Forename is required');
        expect(contactPage.getEmailError()).to.equal('Email is required');
        expect(contactPage.getMessageError()).to.equal('Message is required');
    }

    @test
    'validate mandatory errors fixed'(): void {
        const homePage: HomePage = new HomePage();
        homePage.clickContactMenu();
        const contactPage: ContactPage = new ContactPage();
        contactPage.clickSubmitButton();
        contactPage.setForename('Juan')
            .setEmail('jflorez@planittesting.com')
            .setMessage('Hello');

        expect(contactPage.getForenameError()).to.equal('');
        expect(contactPage.getEmailError()).to.equal('');
        expect(contactPage.getMessageError()).to.equal('');
    }

    @test
    'validate successful submission'(): void {
        const homePage: HomePage = new HomePage();
        homePage.clickContactMenu();
        const contactPage: ContactPage = new ContactPage();
        contactPage.setForename('Juan')
            .setEmail('jflorez@planittesting.com')
            .setMessage('Hello');
        contactPage.clickSubmitButton();

        expect(contactPage.getSuccessMessage()).to.equal('Thanks Juan, we appreciate your feedback.');
    }
}
