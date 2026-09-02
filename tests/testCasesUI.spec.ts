import { test, expect} from "@playwright/test";
import path from "path";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import {generateEmail} from "../utils/generateEmail"
import LoginPage from "../pages/LoginPage";
import ContactUsPage from "../pages/ContactUsPage";
import ProductsPage from "../pages/ProductsPage";

let homePage: HomePage;
let signUpPage: SignUpPage;
let loginPage: LoginPage;
let contactUsPage: ContactUsPage;
let productsPage: ProductsPage;
let email = generateEmail();
const password = "Password123";
const name= "Autotest";
const productName= "Dress";

test("Test Case 1: Register User", async ({page}) => {
    homePage = new HomePage(page);
    signUpPage = new SignUpPage(page);
    email = generateEmail();

    /**
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     */
    await homePage.openPage();

    /**
     * 4. Click on 'Signup / Login' button
     * 5. Verify 'New User Signup!' is visible
     */
    await homePage.selectSignUpLoginButton();
    await expect(page.getByText("New User Signup!")).toBeVisible();

    /**
     * 6. Enter name and email address
     * 7. Click 'Signup' button
     * 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
     */
    await signUpPage.signUp(name, email);
    await expect(page.getByText("Enter Account Information")).toBeVisible();

    /**
     * 9. Fill details: Title, Name, Email, Password, Date of birth
     * 10. Select checkbox 'Sign up for our newsletter!'
     * 11. Select checkbox 'Receive special offers from our partners!'
     * 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
     * 13. Click 'Create Account button'
     * 14. Verify that 'ACCOUNT CREATED!' is visible
     */
    await signUpPage.selectFemaleGender();
    await signUpPage.enterPassword(password);
    await signUpPage.selectBirthday("10", "May", "2000");
    await signUpPage.tickUniformNewsletterCheckbox();
    await signUpPage.enterAddressInformation("Test", "Auto", "Learning", "Address 1", "Canada", "State", "Totonto", "M4W", "+1 (416) 555-0199");
    await signUpPage.enterExtraAddress("Address 2");
    await signUpPage.createAccount();
    await expect(page.getByText("Account Created!")).toBeVisible();

    /**
     * 15. Click 'Continue' button
     * 16. Verify that 'Logged in as username' is visible
     * 17. Click 'Delete Account' button
     * 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
     */
    await page.getByTestId("continue-button").click();
    await expect(page.getByText(` Logged in as ${name}`)).toBeVisible();
    await homePage.selectDeleteButton();
})
test("Test Case 2: Login User with correct email and password", async ({page}) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    email = 'autotest123+4@tutamail.com';

    /**
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     */
    await homePage.openPage();

    /**
     * 4. Click on 'Signup / Login' button
     * 5. Verify 'Login to your account' is visible
     * 6. Enter correct email address and password
     * 7. Click 'login' button
     * 8. Verify that 'Logged in as username' is visible
     */
    await homePage.selectSignUpLoginButton();
    await expect(page.getByText("Login to your account")).toBeVisible();
    await loginPage.login(email, password);
    await expect(page.getByText(` Logged in as ${name}`)).toBeVisible();
})

const invalidLoginCases = [
    { title: "Login User with incorrect password", email: "autotest123+4@tutamail.com", password: "invalid" },
    { title: "Login User with incorrect email", email: "invalid@gmail.com", password: password },
];

for (const testCase of invalidLoginCases) {
    test(`Test Case 3: ${testCase.title}`, async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        /**
         * 1. Launch browser
         * 2. Navigate to url 'http://automationexercise.com'
         * 3. Verify that home page is visible successfully
         */
        await homePage.openPage();

        /**
         * 4. Click on 'Signup / Login' button
         * 5. Verify 'Login to your account' is visible
         */
        await homePage.selectSignUpLoginButton();
        await expect(page.getByText("Login to your account")).toBeVisible();
        /**
         * 6. Enter incorrect password or email address
         * 7. Click 'login' button
         * 8. Verify error 'Your email or password is incorrect!' is visible
         */
        await loginPage.login(testCase.email, testCase.password);
        await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
    });
}
test("Test Case 4: Logout User", async ({page}) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    email = "autotest123+4@tutamail.com"

    /**
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     */
    await homePage.openPage();

    /**
     * 4. Click on 'Signup / Login' button
     * 5. Verify 'Login to your account' is visible
     * 6. Enter correct email address and password
     * 7. Click 'login' button
     * 8. Verify that 'Logged in as username' is visible
     */
    await homePage.selectSignUpLoginButton();
    await expect(page.getByText("Login to your account")).toBeVisible();
    await loginPage.login(email, password);
    await expect(page.getByText(` Logged in as ${name}`)).toBeVisible();

    /**
     * 9. Click 'Logout' button
     * 10. Verify that user is navigated to login page
     */
    await homePage.selectLogoutButton();
    await expect(page).toHaveURL("https://automationexercise.com/login");
})
test("Test Case 5: Register User with existing email", async ({page}) => {
    homePage = new HomePage(page);
    signUpPage = new SignUpPage(page);
    email = "autotest123+4@tutamail.com";

    /**
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     */
    await homePage.openPage();

    /**
     * 4. Click on 'Signup / Login' button
     * 5. Verify 'New User Signup!' is visible
     */
    await homePage.selectSignUpLoginButton();
    await expect(page.getByText("New User Signup!")).toBeVisible();

    /**
     * 6. Enter name and already registered email address
     * 7. Click 'Signup' button
     * 8. Verify error 'Email Address already exist!' is visible
     */
    await signUpPage.signUp(name, email);
    await expect(page.getByText("Email Address already exist!")).toBeVisible();
})
test("Test Case 6: Contact Us Form", async ({page}) => {
    test.setTimeout(40000);
    homePage = new HomePage(page);
    contactUsPage = new ContactUsPage(page);
    email = "autotest123+4@tutamail.com";
    /**
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     */
    await homePage.openPage();

    /**
     * 4. Click on 'Contact Us' button
     * 5. Verify 'GET IN TOUCH' is visible
     * 6. Enter name, email, subject and message
     */
    await homePage.selectContactUsButton();
    await expect(page.getByText("Get In Touch")).toBeVisible();
    await contactUsPage.enterContactUs(name, email, "Subject", "Help me with registration");

    /**
     * 7. Upload file
     */
    const filePath= path.join(__dirname, "..", "test-data", "sample.jpg");
    await contactUsPage.selectUploadFile(filePath);

    /**
     * 8. Click 'Submit' button
     * 9. Click OK button
     */
    //This clicks "OK" on the browser's popup window (a small window like confirm, alert or prompt)
    page.on('dialog', async (dialog) => {
        await dialog.accept();
    });
    await contactUsPage.selectSubmitButton();

    /**
     * 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
     */
    await expect(page.locator('#contact-page').getByText("Success!")).toBeVisible();
})
test("Test Case 7: Verify Test Cases Page", async ({page}) => {
    homePage = new HomePage(page);
    /**
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     */
    await homePage.openPage();

    /**
     * 4. Click on 'Test Cases' button
     * 5. Verify user is navigated to test cases page successfully
     */
    await homePage.selectTestCasesButton();
    await expect(page).toHaveURL("https://automationexercise.com/test_cases");
})
test("Test Case 8: Verify All Products and product detail page", async ({page}) => {
    homePage = new HomePage(page);
    /**
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     */
    await homePage.openPage();

    /**
     * 4. Click on 'Products' button
     * 5. Verify user is navigated to ALL PRODUCTS page successfully
     */
    await homePage.selectProductsButton();
    await expect(page).toHaveURL("https://automationexercise.com/products");

    /**
     * 6. The products list is visible
     */
    await expect(page.locator('.features_items .product-image-wrapper')).not.toHaveCount(0);

    /**
     * 7. Click on 'View Product' of first product
     */
    await page.locator('a[href^="/product_details/"]').first().click();

    /**
     * 8. User is landed to product detail page
     */
    await expect(page).toHaveURL(/product_details/);

    /**
     * 9. Verify that detail is visible: product name, category, price, availability, condition, brand
     */
    const productInfo = page.locator('.product-information');
    await expect(productInfo.locator("h2")).toBeVisible();
    await expect(productInfo.getByText("Category:")).toBeVisible();
    await expect(productInfo.getByText("Rs.")).toBeVisible();
    await expect(productInfo.getByText("Availability:")).toBeVisible();
    await expect(productInfo.getByText("Condition:")).toBeVisible();
    await expect(productInfo.getByText("Brand:")).toBeVisible();
})
test("Test Case 9: Search Product", async ({page}) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);

    /**
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     * 4. Click on 'Products' button
     * 5. Verify user is navigated to ALL PRODUCTS page successfully
     */
    await homePage.openPage();
    await homePage.selectProductsButton();
    await expect(page).toHaveURL("https://automationexercise.com/products");

    /**
     * 6. Enter product name in search input and click search button
     * 7. Verify 'SEARCHED PRODUCTS' is visible
     * 8. Verify all the products related to search are visible
     */
    await productsPage.getProducts(productName);
    await expect(page.getByText("Searched Products")).toBeVisible();
    const productNames = await page.locator('.features_items .productinfo p').allTextContents();

    expect(productNames.length).toBeGreaterThan(0);
})
test("Test Case 10: Verify Subscription in home page", async ({page}) => {
    homePage = new HomePage(page);
    email = generateEmail();

    /**
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     */
    await homePage.openPage();

    /**
     * 4. Scroll down to footer
     * 5. Verify text 'SUBSCRIPTION'
     */
    await (page.getByText("Subscription")).scrollIntoViewIfNeeded();
    await expect(page.getByText("Subscription")).toBeVisible();

    /**
     * 6. Enter email address in input and click arrow button
     * 7. Verify success message 'You have been successfully subscribed!' is visible
     */
    await homePage.fillSubscriptionInput(email);
    await expect(page.getByText("You have been successfully subscribed!")).toBeVisible();
})
