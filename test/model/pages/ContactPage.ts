import { BasePage } from "./BasePage";

export class ContactPage extends BasePage {

    private getErrorText(locator: string): string {
        const elements = $$(locator);
        if (elements.length > 0) {
            return elements[0].getText();
        } else {
            return "";
        }
    }

    public getFornameError(): string {
        return this.getErrorText('#forename-err');
    }

    public clickSubmitButton() {
        $(".btn-primary").click();
    }
}