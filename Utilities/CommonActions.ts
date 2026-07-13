import { Page, Locator } from '@playwright/test';

export class commonActions{

    private readonly page: Page;

    constructor(page: Page) {

        this.page = page;

       console.log("******** Common acctions Loaded ********");
    }


async closeInventoryPopup() {
    
    // Wait for spinner to finish (if present)
    await this.page.locator("ngx-spinner")
        .waitFor({ state: "hidden", timeout: 30000 })
        .catch(() => {});

    const popup = this.page.locator("modal-container[role='dialog']");

    try {

        // Give the popup a chance to appear
        await popup.waitFor({
            state: "visible",
            timeout: 5000
        });

        console.log("Inventory popup displayed.");

        const closeIcon = popup.locator(".p-sidebar-close-icon");

        await closeIcon.click();

        await popup.waitFor({
            state: "hidden",
            timeout: 10000
        });

        console.log("Inventory popup closed.");

    } catch {

        console.log("Inventory popup not displayed.");

    }
}

}