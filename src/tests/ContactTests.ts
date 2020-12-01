import {params, suite, test} from '@testdeck/mocha';
import {expect} from 'chai';
import {ContactData} from 'src/model/data';
import {HomePage, ContactPage, open} from '../model/pages';
import {ContactDataProvider} from './dataProviders';

@suite
export class ContactTests {
    @test
    'validate mandatory errors'(): void {
        const contactPage: ContactPage = open(HomePage).clickContactMenu().clickSubmitButton();
        
        expect(contactPage.getForenameError()).to.equal('Forename is required');
        expect(contactPage.getEmailError()).to.equal('Email is required');
        expect(contactPage.getMessageError()).to.equal('Message is required');
    }

    @test
    'validate mandatory errors fixed'(): void {
        const contactPage: ContactPage = open(HomePage).clickContactMenu()
            .clickContactMenu()
            .clickSubmitButton()
            .setForename('Juan')
            .setEmail('jflorez@planittesting.com')
            .setMessage('Hello');

        expect(contactPage.getForenameError()).to.equal('');
        expect(contactPage.getEmailError()).to.equal('');
        expect(contactPage.getMessageError()).to.equal('');
    }

    @test
    'validate successful submission'(): void {
        const contactPage: ContactPage = open(HomePage)
            .clickContactMenu()
            .setForename('Juan')
            .setEmail('jflorez@planittesting.com')
            .setMessage('Hello')
            .clickSubmitButton();

        expect(contactPage.getSuccessMessage()).to.equal('Thanks Juan, we appreciate your feedback.');
    }
}

new ContactDataProvider('contact_data.json').getData().forEach(contactData => {
    /* eslint-disable no-unused-vars */
    /* eslint-disable @typescript-eslint/no-unused-vars */
    @suite
    class DataDrivenTests {
        @params(contactData)
        @params.naming((contactData: ContactData) => `Validating submission for ${contactData.forename}, ${contactData.email}, ${contactData.message}`)
        'validate successful submission data driven'(contactData: ContactData): void {
            const contactPage: ContactPage = open(HomePage)
                .clickContactMenu()
                .setContactData(contactData)
                .clickSubmitButton();
        
            expect(contactPage.getSuccessMessage()).to.equal(`Thanks ${contactData.forename}, we appreciate your feedback.`);
        }
    }
});
