import { Page, Locator } from '@playwright/test';

export class commonActions{

    private readonly page: Page;

    constructor(page: Page) {

        this.page = page;

       console.log("******** Common acctions Loaded ********");
    }


async closeInventoryPopup() {

    const popup = this.page.locator("div.modal-content");

    if (!(await popup.isVisible().catch(() => false))) {
        console.log("Inventory popup not displayed.");
        return;
    }

    console.log("Inventory popup displayed.");

    const closeButton = popup.locator("button:has-text('Close')");

    await closeButton.waitFor({ state: "visible" });

    await closeButton.click();

    console.log("Inventory popup closed.");

    // Wait until popup disappears
    await popup.waitFor({ state: "hidden" });

    console.log("Popup completely disappeared.");
}
}