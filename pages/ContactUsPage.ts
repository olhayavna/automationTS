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
        // The Contact Us <form> has no enctype="multipart/form-data", so the real file content
        // never reaches the server anyway (only the filename is sent) — but the site's own JS
        // still needs a moment to react to the file input's "change" event before Submit is
        // clicked, or the success message sometimes fails to render. Verified via network trace.
        await this.page.waitForTimeout(500);
    }

    async selectSubmitButton(): Promise<void> {
        await this.submitButton.click();
    }

}