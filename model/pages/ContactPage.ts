import BasePage from "./BasePage";

export default class ContactPage extends BasePage {
    public getForenameError(): string {
        return $('#forename-err').getText();
    }
    public getEmailError(): string {
        return $('#email-err').getText();
    }
    public getMessageError(): string {
        return $('#message-err').getText();
    }
    public clickSubmitButton(): void {
        $('.btn-primary').click();
    }
}