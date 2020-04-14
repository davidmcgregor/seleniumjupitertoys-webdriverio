import { BaseTest } from "./BaseTest";
import { suite, test } from "mocha-typescript"
import { expect } from 'chai';
import { HomePage } from "../model/pages/HomePage";
import { ContactPage } from "../model/pages/ContactPage";

@suite
export class ContactTests extends BaseTest {

    @test
    public 'validate mandatory error fields'() {
        let homePage: HomePage = new HomePage();
        homePage.clickContactMenu();
        let contactPage: ContactPage = new ContactPage();
        contactPage.clickSubmitButton();
        expect(contactPage.getFornameError()).to.equal('Forename is required');
    }
}