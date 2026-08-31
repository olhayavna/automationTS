import { Page, Locator} from "@playwright/test";

export default class HomePage {
    page: Page;
    readonly signUpLoginButton: Locator;


    constructor(page: Page) {
        this.page = page;

        //Locators
        this.signUpLoginButton= page.getByText(" Signup / Login");


    }

    //Actions
    async openPage() {
        await this.page.goto('https://automationexercise.com');
    }

    async selectSignUpLoginButton() {
        await this.signUpLoginButton.click();
    }
}
