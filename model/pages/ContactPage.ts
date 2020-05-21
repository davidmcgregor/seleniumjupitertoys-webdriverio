import BasePage from "./BasePage";

export default class ContactPage extends BasePage {
    getForenameError(): string {
        return $('#forename-err').getText();
    }
    getEmailError(): string {
        return $('#email-err').getText();
    }
    getMessageError(): string {
        return $('#message-err').getText();
    }
    clickSubmitButton(): void {
        $('.btn-primary').click();
    }
}