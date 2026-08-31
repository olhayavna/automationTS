import { Page, Locator} from "@playwright/test";

export default class SignUpPage {
    page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly signUpButton: Locator;
    readonly maleGenderSelect: Locator;
    readonly femaleGenderSelect: Locator;
    readonly passwordInput: Locator;
    readonly daySelect: Locator;
    readonly monthSelect: Locator;
    readonly yearSelect: Locator;
    readonly uniformNewsletterCheckbox: Locator;
    readonly uniformOptionCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly address2Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipCodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;

        //Locators
        this.nameInput = page.getByTestId('signup-name');
        this.emailInput = page.getByTestId('signup-email');
        this.signUpButton = page.getByTestId('signup-button');
        this.maleGenderSelect = page.locator('#id_gender1');
        this.femaleGenderSelect = page.locator('#id_gender2');
        this.passwordInput = page.getByTestId('password');
        this.daySelect = page.getByTestId('days');
        this.monthSelect = page.getByTestId('months');
        this.yearSelect = page.getByTestId('years');
        this.uniformNewsletterCheckbox = page.locator('#newsletter');
        this.uniformOptionCheckbox = page.locator('#optin');
        this.firstNameInput = page.getByTestId('first_name');
        this.lastNameInput = page.getByTestId('last_name');
        this.companyInput = page.getByTestId('company');
        this.addressInput = page.getByTestId('address');
        this.address2Input = page.getByTestId('address2');
        this.countrySelect = page.getByTestId('country');
        this.stateInput = page.getByTestId('state');
        this.cityInput = page.getByTestId('city');
        this.zipCodeInput = page.getByTestId('zipcode');
        this.mobileNumberInput = page.getByTestId('mobile_number');
        this.createAccountButton = page.getByTestId('create-account');
    }

    //Actions
    async openPage() {
        await this.page.goto('https://automationexercise.com/login');
    }

    /**
     * First Step of Signing Up
     */
    async signUp(name: string, email: string ) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signUpButton.click();
    }

    /**
     * Enter account information
     */

    /**
     * Choose a gender
     */
    async selectMaleGender() {
        await this.maleGenderSelect.click();
    }

    async selectFemaleGender() {
        await this.femaleGenderSelect.click();
    }

    /**
     * Enter password
     */
    async enterPassword (password: string) {
        await this.passwordInput.fill(password);
    }

    /**
     * Select Birthdate
      */
    async selectBirthday(day: string, month: string, year: string) {
        await this.daySelect.selectOption(day);
        await this.monthSelect.selectOption({label: month});
        await this.yearSelect.selectOption(year);
    }

    /**
     * Tick the box
     */
    async tickUniformOptionCheckbox() {
        await this.uniformOptionCheckbox.check();
    }

    async tickUniformNewsletterCheckbox() {
        await this.uniformNewsletterCheckbox.check();
    }

    /**
     * Enter Address Information
     */
    async enterAddressInformation(firstName: string, lastName: string, companyName: string, address: string, country: string, state: string, city: string, zipCode: string, mobileNumber: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(companyName);
        await this.addressInput.fill(address);
        await this.countrySelect.selectOption(country);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipCodeInput.fill(zipCode);
        await this.mobileNumberInput.fill(mobileNumber);
    }

    async enterExtraAddress(address: string) {
        await this.address2Input.fill(address);
    }

    /**
     * Create an account button
     */
    async createAccount() {
        await this.createAccountButton.click();
    }

}