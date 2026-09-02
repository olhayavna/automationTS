import { Page, Locator} from "@playwright/test";

export default class ContactUsPage {
    page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly uploadFile: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;

        //Locators
        this.nameInput = page.getByTestId("name");
        this.emailInput = page.getByTestId("email");
        this.subjectInput = page.getByTestId("subject");
        this.messageInput = page.getByTestId("message");
        this.uploadFile = page.locator('input[name="upload_file"]');
        this.submitButton = page.getByTestId('submit-button');

    }

    //Actions
    async enterContactUs(name:string, email: string, subject: string, messageContactUs: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(messageContactUs);
    }

    async selectUploadFile(filePath:string): Promise<void> {
        await this.uploadFile.setInputFiles(filePath);
        await this.page.waitForTimeout(500); // give the site's JS a moment to process the file "change" event before Submit is clicked
    }

    async selectSubmitButton(): Promise<void> {
        await this.submitButton.click();
    }

}