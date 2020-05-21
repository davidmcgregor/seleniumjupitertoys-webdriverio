export default abstract class BasePage {
    private value: string = 'a'
    public clickContactMenu(): void {
        $('#nav-contact a').click();
    }
}