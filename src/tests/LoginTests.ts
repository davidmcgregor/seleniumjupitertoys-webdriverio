import {suite, test} from '@testdeck/mocha';
import {HomePage, open} from '../model/pages';
import 'chai/register-should';

@suite
export class LoginTests {
    @test
    'validate successful login'(): void {
        open(HomePage).clickLoginMenu()
            .setUsername('juan')
            .setPassword('letmein')
            .clickAgreeCheckBox()
            .clickLoginButton()
            .getUser().should.equal('juan');
    }

    @test
    'validate successful logout'(): void {
        open(HomePage).clickLoginMenu()
            .setUsername('juan')
            .setPassword('letmein')
            .clickAgreeCheckBox()
            .clickLoginButton()
            .clickLogoutMenu()
            .clickLogoutButton()
            .getUser().should.equal('');
    }
}
