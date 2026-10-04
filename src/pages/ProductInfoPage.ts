

import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

    //private locators:
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private productInfoMap: Map<string, string | number>;
    private readonly productQuantity: Locator;
    private readonly addTocartButton: Locator;
    private readonly shopingCartLink: Locator;

    //const... of the class....init the locators:
    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.productInfoMap = new Map<string, string | number>();
        this.productQuantity = page.getByRole('textbox', { name: 'Qty' });
        this.addTocartButton= page.getByRole('button', { name: 'Add to Cart' });
        this.shopingCartLink= page.getByRole('link', { name: 'shopping cart' });


        
        
    }


    //page actions:
    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductImagesCount(): Promise<number> {
        await this.productImages.first().waitFor({ state: 'visible' });
        return await this.productImages.count();
    }


    async getProductInfo(): Promise<Map<string, string | number>> {
        this.productInfoMap.set('productheader', await this.getProductHeader());
        this.productInfoMap.set('productimagescount', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPriceData();
        return this.productInfoMap;
    }

    // Brand: Apple
    // Product Code: Product 18
    // Reward Points: 800
    // Availability: Out Of Stock
    private async getProductMetaData(): Promise<void> {
        let metaData = await this.productMetaData.allInnerTexts();
        for (let data of metaData) {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.productInfoMap.set(metaKey, metaValue);
        }
    }

    // $2,000.00
    // Ex Tax: $2,000.00
    private async getProductPriceData(): Promise<void> {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.productInfoMap.set('productprice', productPrice);
        this.productInfoMap.set('extaxprice', exTaxPrice);
    }


    async productCartVisibilityCheck(): Promise<boolean> {
         
      await this.productQuantity.waitFor({ state: 'visible' });

      return this.productQuantity.isVisible();
    }

    async productCartQuantityCheck(): Promise<string> {
         
      await this.productQuantity.waitFor({ state: 'visible' });

      return await this.productQuantity.inputValue();

    }

    async clickAddToCartBtn(): Promise<void>{
        await this.addTocartButton.waitFor({state: 'visible' });
        await this.addTocartButton.isVisible();
        await this.addTocartButton.click();
        await this.shopingCartLink.isVisible();
        await this.shopingCartLink.click();

    }

}
