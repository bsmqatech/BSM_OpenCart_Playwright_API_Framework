import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class ShoppingCartPage extends BasePage {

    //private locators:
    private readonly shoppingCartLink: Locator;
    

    //const... of the class....init the locators:
    constructor(page: Page) {
        super(page);
        this.shoppingCartLink = page.getByRole('link', { name: 'Shopping Cart' }).last();
    }


      async shoppingCartPageTitle(): Promise<string>{
        return await this.page.title();
     }


     async isShoppingCartLinkExist(): Promise<boolean>{

        return await this.shoppingCartLink.isVisible();
    
     }

}