import {params, suite, test} from '@testdeck/mocha';
import {HomePage, open} from '../model/pages';
import 'chai/register-should';
import { LoginData } from 'src/model/data';

@suite
export class LoginTests {
    @params({username:"someone", password:"letmein"})
    @params.naming((loginData: LoginData) => `validate successful login for ${loginData.username}`)
    'validate successful login'(loginData: LoginData): void {
        open(HomePage).clickLoginMenu()
            .login(loginData)
            .getUser().should.equal(loginData.username);
    }

    @test
    'validate successful logout'(): void {
        open(HomePage).clickLoginMenu()
            .setUsername('someone')
            .setPassword('letmein')
            .clickAgreeCheckBox()
            .clickLoginButton()
            .clickLogoutMenu()
            .clickLogoutButton()
            .getUser().should.equal('');
    }
}
