
import { Page, Locator, expect } from '@playwright/test';
import { FrameManager } from '../Utilities/FrameManager';
import { CommonActions } from '../Utilities/CommonActions';
import { Home } from '../pages/Home';
import { HomePage } from '../pages/HomePage';
export class Accounting {
    private readonly page: Page;
    private readonly commonActions: CommonActions;
    private readonly home: Home;
    //  private readonly homePage: HomePage;
    private readonly popupIcon: Locator;
    private readonly EventVendorBills: Locator;
    private readonly ReadyButton: Locator;
    private readonly DashBoard: Locator;
    private readonly billHeader: Locator;
    private readonly FinalizeBtn: Locator;
    private readonly sentLink: Locator;
    private readonly AcceptBtn: Locator;
private readonly invoiceBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        const frameManager = new FrameManager(page);
        this.commonActions = new CommonActions(page);
        this.home = new Home(page);
        this.popupIcon = this.page.frameLocator('frame[name="prsnlrequest"]').locator('img[src*="dhtml_popup.gif"]').first();
        this.EventVendorBills = this.page.frameLocator('frame[name="right"]').getByRole('link', { name: 'Event Vendor Bills' });
        this.ReadyButton = this.page.frameLocator('frame[name="right"]').locator("#dijit_form_Button_0_label");
        this.DashBoard = page
            .locator("//span[@ptooltip='Event Dashboard']")
            .first();

        this.billHeader = this.page.locator('.header-fs', {
            hasText: 'Billing'
        });
        this.FinalizeBtn = page.getByRole('button', { name: 'Finalize' });
        this.sentLink = page.frameLocator('frame[name="right"]').locator('td[title="Billing"] a');
         this.AcceptBtn = page.frameLocator('frame[name="right"]').locator('#ack_label');
         this.invoiceBtn = page.frameLocator('frame[name="right"]').locator('#invoice_label').first();





    }


    async AccountingVendorBills() {

        const frame = this.page.frameLocator('frame[name="right"]');

        const popupIcon = frame
            .locator('img[src*="dhtml_popup.gif"]')
            .first();

        console.log("Before mouse move");

        const box = await popupIcon.boundingBox();

        if (!box) {
            throw new Error("Popup icon not found");
        }

        await this.page.mouse.move(
            box.x + box.width / 2,
            box.y + box.height / 2
        );

        console.log("Mouse moved to popup icon");

        const menu = frame.locator('#popmenu');

        console.log("Popmenu count:", await menu.count());

        if (await menu.count() > 0) {
            console.log("Popmenu visible:", await menu.isVisible());
        }
        await this.EventVendorBills.click();
        console.log("EventVendorBills");



       

        await this.ReadyButton.click();
         console.log("Ready btn click");

        let dialog = null;

        try {
            dialog = await this.page.waitForEvent('dialog', {
                timeout: 3000
            });
        } catch {
            console.log("No alert. Item quantified successfully.");
        }

        if (dialog) {

            console.log("Alert displayed:", dialog.message());

            await dialog.accept();

            
        }


      


      






    }

    async AccountingService() {

        await this.DashBoard.click();

    }
    async openbillService() {

        const headerText = await this.billHeader.textContent();

        console.log(headerText);

        const BillCard = this.page.locator('.card').filter({
            has: this.page.getByText('Billing  -')
        });
        const serviceIcon =
            BillCard.locator('.service-request .icon-circle').first();
        console.log(await BillCard.locator('.icon-circle').count());
        // Step 3: If Bill is New
        if (headerText?.includes('Rdy')) {

            console.log("Bill is ready");
            await serviceIcon.click();
        }
        // Step 4: If Bill is Prog
        else if (headerText?.includes('Prog')) {

            console.log("Bill is In Progress");
            await serviceIcon.click();

        }
        // Step 5: If Bill is None
        else {

            console.log("Bill Service Not Available");

        }


    }

    async BillProcess() {

        await this.FinalizeBtn.click();

        await this.page
            .getByRole("button", { name: /close/i })
            .click();

    }
    async AccountingAccept() {

await this.sentLink.click();
await this.AcceptBtn.click();
await this.invoiceBtn.click();


    }

}









/*




*/