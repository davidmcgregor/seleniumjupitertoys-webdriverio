
import {expect} from 'chai';
import {ContactData} from 'src/model/data';
import {HomePage, ContactPage, open} from '../model/pages';
import {ContactDataProvider} from './dataProviders';

describe('ContactTests', () => {
    it('validate mandatory errors', () => {
        const contactPage: ContactPage = open(HomePage).clickContactMenu().clickSubmitButton();
        
        expect(contactPage.getForenameError()).to.equal('Forename is required');
        expect(contactPage.getEmailError()).to.equal('Email is required');
        expect(contactPage.getMessageError()).to.equal('Message is required');
    });

    it('validate mandatory errors fixed', () => {
        const contactPage: ContactPage = open(HomePage).clickContactMenu()
            .clickContactMenu()
            .clickSubmitButton()
            .setForename('Juan')
            .setEmail('jflorez@planittesting.com')
            .setMessage('Hello');

        expect(contactPage.getForenameError()).to.equal('');
        expect(contactPage.getEmailError()).to.equal('');
        expect(contactPage.getMessageError()).to.equal('');
    });

    it('validate successful submission', () => {
        const contactPage: ContactPage = open(HomePage)
            .clickContactMenu()
            .setForename('Juan')
            .setEmail('jflorez@planittesting.com')
            .setMessage('Hello')
            .clickSubmitButton();

        expect(contactPage.getSuccessMessage()).to.equal('Thanks Juan, we appreciate your feedback.');
    });

    new ContactDataProvider('contact_data.json').getData().forEach((contactData: ContactData) => {
        it(`Validating submission for ${contactData.forename}, ${contactData.email}, ${contactData.message}`, () => {
            const contactPage: ContactPage = open(HomePage)
                .clickContactMenu()
                .setForename(contactData.forename)
                .setEmail(contactData.email)
                .setMessage(contactData.message)
                .clickSubmitButton();
        
            expect(contactPage.getSuccessMessage()).to.equal(`Thanks ${contactData.forename}, we appreciate your feedback.`);
        });
    });
});
