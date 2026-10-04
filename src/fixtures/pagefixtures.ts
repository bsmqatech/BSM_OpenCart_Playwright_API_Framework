import { test as baseTest } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CsvHelper } from '../utils/CsvHelper';


type pageFixtures = {
    basePage: BasePage,
    loginPage: LoginPage,
    homePage: HomePage,
    searchResultsPage: SearchResultsPage,
    productInfoPage: ProductInfoPage,
    shoppingCartPage: ShoppingCartPage
};

//extend the playright test: using baseTest.extend: inheritance
export let test = baseTest.extend<pageFixtures>({

    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchResultsPage: async ({ page }, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    shoppingCartPage: async ({ page }, use) => {
        let shoppingCart = new ShoppingCartPage(page);
        await use(shoppingCart);
    },

      testData: async ({ }, use) => {
        let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv');
        await use(testCSVData);
    }
});

export { expect } from '@playwright/test';



