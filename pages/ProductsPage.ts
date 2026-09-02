import {Page, Locator} from "@playwright/test";

export default class ProductsPage {
    page: Page;
    readonly searchInput: Locator;
    readonly submitSearch: Locator;

    constructor(page: Page) {
        this.page = page;

        //Locators
        this.searchInput = page.getByPlaceholder('Search Product');
        this.submitSearch = page.locator('#submit_search');

    }

    //Actions
    async getProducts(productName: string){
        await this.searchInput.fill(productName);
        await this.submitSearch.click();
    }

}
