import {suite, test} from '@testdeck/mocha';
import {HomePage, open} from '../model/pages';
import 'chai/register-should';

@suite
export class LoginTests {
    @test
    'validate successful login'(): void {
        const homePage: HomePage = open(HomePage);
        homePage.clickLoginMenu().setUsername('juan')
            .setPassword('letmein')
            .clickAgreeCheckBox()
            .clickLoginButton();
        homePage.getUser().should.equal('juan');
    }

    @test
    'validate successful logout'(): void {
        const homePage: HomePage = open(HomePage);
        homePage.clickLoginMenu().setUsername('juan')
            .setPassword('letmein')
            .clickAgreeCheckBox()
            .clickLoginButton();
        homePage.clickLogoutMenu().clickLogoutButton();
        homePage.getUser().should.equal('');
    }
}
