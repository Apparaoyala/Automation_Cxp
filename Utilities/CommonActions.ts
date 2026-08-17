import { Page, Locator,expect } from '@playwright/test';
import { Event } from '../pages/Event';


export class commonActions{

    private readonly page: Page;

    constructor(page: Page) {

        this.page = page;

       console.log("******** Common actions Loaded ********");
    }


async closeCommonPopup(){
    
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
async closeUnacknowledgedpopup() {

    for (let i = 0; i < 10; i++) {

        const pages = this.page.context().pages();

        console.log("Pages Count:", pages.length);

        if (pages.length > 1) {

            const childPage = pages[1];

            console.log(
                "Child Window:",
                await childPage.title()
            );

            await childPage.waitForLoadState();

            await childPage
                .frameLocator('frame[name="right"]')
                .getByRole('button', { name: 'Close' })
                .click();

            console.log("Popup Closed");

            return;
        }

        await this.page.waitForTimeout(1000);
    }

    console.log("No child window appeared");
}
async closeKitchenPopup2() {
console.log(
  "Pages Count:",
await this.page.context().pages().length
);
    const popupTitle =this.page.frameLocator('frame[name="header"]').getByText('Unacknowledged Change Requests');

    try {

    await popupTitle.waitFor({
            state: "visible",
            timeout: 5000
        });
        console.log('Popup displayed');
        
const closeIcon = this.page.getByRole('button', { name: 'Close' });

        await closeIcon.first().click();;
      
        await popupTitle.waitFor({
            state: 'hidden',
            timeout: 30000
        });

        console.log('Popup closed');

    } catch {

        console.log('Popup not displayed');
    }
}
}