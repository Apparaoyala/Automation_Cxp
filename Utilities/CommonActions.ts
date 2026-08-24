import { Page, Locator, expect } from '@playwright/test';
import { Event } from '../pages/Event';

//import { KitchenService } from '../pages/Kitchen';

export class CommonActions {

    private readonly page: Page;

    constructor(page: Page) {
        //const kitchen=new KitchenService(page)
        this.page = page;

        console.log("******** Common actions Loaded ********");
    }


    async closeCommonPopup() {

        // Wait for spinner to finish (if present)
        await this.page.locator("ngx-spinner")
            .waitFor({ state: "hidden", timeout: 30000 })
            .catch(() => { });

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
    async Constraintspopup() {

        for (let i = 0; i < 10; i++) {

            const pages = this.page.context().pages();

            if (pages.length > 1) {

                const childPage = pages[pages.length - 1];

                console.log(
                    "Child Window:",
                    await childPage.title()
                );

                await childPage.waitForLoadState();

                await childPage

                    .getByRole('button', { name: 'save' })
                    .click();

                console.log("Popup Closed");

                return;
            }

            await this.page.waitForTimeout(5000);
        }

        console.log("No child window appeared");
    }
    async closeUnacknowledgedpopup() {

        for (let i = 0; i < 10; i++) {

            const pages = this.page.context().pages();

            if (pages.length > 1) {

                const childPage = pages[pages.length - 1];

                console.log(
                    "Child Window:",
                    await childPage.title()
                );

                await childPage.waitForLoadState();
                await childPage
                    .frameLocator('frame[name="right"]')
                    .getByRole('button', { name: 'Close' })
                    .scrollIntoViewIfNeeded();

                await childPage
                    .frameLocator('frame[name="right"]')
                    .getByRole('button', { name: 'Close' })
                    .click();

                console.log("Popup Closed");

                return;
            }

            await this.page.waitForTimeout(2000);
        }

        console.log("No child window appeared");
    }
    async Unacknowledgedpopup() {

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
    async childwindow1() {

        for (let i = 0; i < 10; i++) {

            const pages = this.page.context().pages();

            console.log("Pages Count:", pages.length);

            if (pages.length > 1) {

                const childPage = pages[pages.length - 1];

                console.log(
                    "Child Window:",
                    await childPage.title()
                );

                await childPage.waitForLoadState();

                const cisNum = childPage
                    .frameLocator('frame[name="right"]')
                    .locator('#cisnumber');

                const applyBtn = childPage
                    .frameLocator('frame[name="right"]')
                    .locator('#apply_label');

                await cisNum.fill("3841");

                await applyBtn.scrollIntoViewIfNeeded();

                await applyBtn.click();

                console.log("Apply button clicked");

                return;
            }

            await this.page.waitForTimeout(1000);
        }

        console.log("No child window appeared");
    }
    async childwindow() {

        for (let i = 0; i < 10; i++) {

            const pages = this.page.context().pages();

            console.log("Pages Count:", pages.length);

            if (pages.length > 1) {

                const childPage = pages[pages.length - 1];

                console.log(
                    "Child Window:",
                    await childPage.title()
                );

                await childPage.waitForLoadState();

                const cisNum = childPage

                    .locator('#cisnumber');

                const applyBtn = childPage

                    .locator('#apply_label');

                await cisNum.fill("3841");

                await applyBtn.scrollIntoViewIfNeeded();

                await applyBtn.click();

                console.log("Apply button clicked");

                return;
            }

            await this.page.waitForTimeout(1000);
        }

        console.log("No child window appeared");
    }

    async Show_workers_childwindow() {

        for (let i = 0; i < 10; i++) {

            const pages = this.page.context().pages();

            console.log("Pages Count:", pages.length);

            if (pages.length > 1) {

                const childPage = pages[pages.length - 1];

                console.log(
                    "Child Window:",
                    await childPage.title()
                );

                await childPage.waitForLoadState();

                const GoBtn = childPage.frameLocator('frame[name="list"]')

                    .locator('#dijit_form_Button_0_label');

                const ClickCheckBox = childPage.frameLocator('frame[name="list"]')

                    .locator('#chkItem1');
                const AddBtn = childPage.frameLocator('frame[name="list"]')

                    .locator('#dijit_form_Button_1_label');

                await GoBtn.click();
                await ClickCheckBox.click();
                const childClosePromise = childPage.waitForEvent('close');

                await AddBtn.click();

                console.log("AddBtn button clicked");

                await childClosePromise;

                console.log("Child window closed");

                await this.page.waitForTimeout(3000);
            }

            console.log("No child window appeared");
        }
    }
}
