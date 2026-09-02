import { Page, Locator} from "@playwright/test";

export default class LoginPage {
    page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        //Locators
        this.emailInput= page.getByTestId("login-email");
        this.passwordInput= page.getByTestId("login-password");
        this.loginButton = page.getByTestId("login-button");

    }

    //Actions
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}