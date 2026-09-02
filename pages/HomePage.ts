import {Page, Locator, expect} from "@playwright/test";

export default class HomePage {
    page: Page;
    readonly signUpLoginButton: Locator;
    readonly deleteButton: Locator;
    readonly logoutButton: Locator;
    readonly contactUsButton: Locator;
    readonly testCasesButton: Locator;
    readonly productsButton: Locator;
    readonly subscriptionInput: Locator;
    readonly subscriptionSubmitButton: Locator;


    constructor(page: Page) {
        this.page = page;

        //Locators
        this.signUpLoginButton= page.getByText(" Signup / Login");
        this.deleteButton= page.getByText(" Delete Account");
        this.logoutButton= page.getByText(" Logout");
        this.contactUsButton= page.getByText(" Contact us");
        this.testCasesButton= page.getByRole('link', { name: 'Test Cases' }).first();
        this.productsButton = page.getByText(" Products");
        this.subscriptionInput = page.getByPlaceholder("Your email address");
        this.subscriptionSubmitButton = page.locator("#subscribe");
    }

    //Actions
    async openPage() {
        await this.page.goto('https://automationexercise.com');
        await expect(this.signUpLoginButton).toBeVisible();

    }

    async selectSignUpLoginButton() {
        await this.signUpLoginButton.click();
    }

    async selectDeleteButton() {
        await this.deleteButton.click();
        await expect(this.page.getByTestId("account-deleted")).toBeVisible();
    }

    async selectLogoutButton() {
        await this.logoutButton.click();
    }

    async selectContactUsButton() {
        await this.contactUsButton.click();
    }

    async selectTestCasesButton() {
        await this.testCasesButton.click();
    }

    async selectProductsButton() {
        await this.productsButton.click();
    }

    async fillSubscriptionInput(email: string) {
        await this.subscriptionInput.fill(email);
        await this.subscriptionSubmitButton.click();
    }
}
