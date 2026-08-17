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

    const pages = this.page.context().pages();

    for (const p of pages) {

        const title = await p.title();

        if (title.includes("Unacknowledged Change Requests")) {

            console.log("Popup Window Found");

         const closeBtn = p
    .frameLocator('frame[name="right"]')
    .getByRole('button', { name: 'Close' });

await closeBtn.waitFor({
    state: 'visible',
    timeout: 10000
});

await closeBtn.click();

            console.log("Popup Closed");

            return;
        }
    }

    console.log("Popup Not Displayed");
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