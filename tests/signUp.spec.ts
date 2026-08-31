import { test, expect} from "@playwright/test";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import {generateEmail} from "../utils/generateEmail"

let homePage: HomePage;
let signUpPage: SignUpPage;
let email = generateEmail();

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
    await expect(homePage.signUpLoginButton).toBeVisible({
        timeout: 5000
    });

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
    const name= "Autotest";
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
    await signUpPage.enterPassword("Password123");
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
    await page.getByText(" Delete Account").click();
    await expect(page.getByTestId("account-deleted")).toBeVisible();

})