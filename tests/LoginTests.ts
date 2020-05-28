import {suite, test} from '@testdeck/mocha';
// import {expect} from 'chai';
import {HomePage} from 'model/pages';
import {LoginDialog, LogoutDialog} from 'model/dialogs';
import 'chai/register-should';

@suite
export class LoginTests {
    @test
    'validate successful login'(): void {
        const homePage: HomePage = new HomePage();
        const loginDialog: LoginDialog = homePage.clickLoginMenu();
        loginDialog.setUsername('juan')
            .setPassword('letmein')
            .clickAgreeCheckBox()
            .clickLoginButton();
        homePage.getUser().should.equal('juan');
        // expect(homePage.getUser()).to.equal('juan');
    }

    @test
    'validate successful logout'(): void {
        const homePage: HomePage = new HomePage();
        const loginDialog: LoginDialog = homePage.clickLoginMenu();
        loginDialog.setUsername('juan')
            .setPassword('letmein')
            .clickAgreeCheckBox()
            .clickLoginButton();
        const logoutDialog: LogoutDialog = homePage.clickLogoutMenu();
        logoutDialog.clickLogoutButton();

        homePage.getUser().should.equal('');
        // expect(homePage.getUser()).to.equal('');
    }
}
