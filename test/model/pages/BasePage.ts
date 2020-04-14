export abstract class BasePage {
    
    public clickContactMenu(): void {
        $("#nav-contact a").click();
    }

    public clickShopMenu(): void {
        $("#nav-shop a").click();
    }

}