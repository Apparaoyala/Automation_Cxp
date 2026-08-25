import { Page, Locator, expect } from '@playwright/test';
import { FrameManager } from '../Utilities/FrameManager';
import { CommonActions } from '../Utilities/CommonActions';
import { Home } from '../pages/Home';
export class KitchenService {

    private readonly page: Page;

    private readonly filter: Locator;
    private readonly CisNum: Locator;
    private readonly Applybtn: Locator;
    private readonly sent: Locator;
    private readonly Accept: Locator;
    private readonly AcceptStatus: Locator;
    private readonly QuantificationLink: Locator;
    private readonly GatherAll: Locator;
    private readonly QuntifyAll: Locator;
    private readonly CloseBtn: Locator;
    // private readonly Ack: Locator;
    private readonly Bill: Locator;
    private readonly ChangeReq: Locator;
    private readonly ChangeReqEditIcon: Locator;
    // private readonly ChangeReqAccept: Locator;
    private readonly commonActions: CommonActions;
    private readonly home: Home;
    constructor(page: Page) {

        this.page = page;


        this.sent = this.page.frameLocator('frame[name="right"]').getByRole('link', { name: 'Sent' });

        this.filter = page.frameLocator('frame[name="header"]').getByRole('link', { name: 'Filter', exact: true });
        this.CisNum = page.frameLocator('frame[name="right"]').locator('#cisnumber');
        this.Applybtn = page.frameLocator('frame[name="right"]').locator('#apply_label');
        this.AcceptStatus = this.page.frameLocator('frame[name="right"]').getByRole('link', { name: 'Accpt', exact: true });
        this.Bill = this.page.frameLocator('frame[name="right"]').locator('#billBtn');
        this.Accept = this.page.frameLocator('frame[name="right"]').locator('#acceptBtn_label');
        this.ChangeReq = page.frameLocator('frame[name="header"]').getByRole('link', { name: 'Change Requests', exact: true });
        this.QuantificationLink = page.frameLocator('frame[name="header"]').getByRole('link', { name: 'Quantification', exact: true });

        this.ChangeReqEditIcon = page.frameLocator('frame[name="view"]').getByAltText('edit').first();
        this.QuntifyAll = page.frameLocator('frame[name="header"]').getByAltText('Save prep item quantities as per maintenance').first();
        this.GatherAll = page.frameLocator('frame[name="header"]').getByAltText('Add all prep items to the gather list').first();

        this.CloseBtn = this.page.frameLocator('frame[name="view"]').locator('#dijit_form_Button_0');
        const frameManager = new FrameManager(page);
        this.commonActions = new CommonActions(page);
        this.home = new Home(page);

    }


    async CreateEvent() {

        //this.Kitchen= page.getByRole('button', { name: 'Event Listing' });
        //   this.Kitchen = page.locator('span').filter({ hasText: 'Create Event' }).first();



    }


    async Filter() {

        const [filterPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.filter.click()
        ]);

        await filterPage.waitForLoadState();

        console.log("Filter window:", await filterPage.title());

        const cisNum = filterPage
            .locator('#cisnumber');
        await cisNum.fill('4093');
        const applyBtn = filterPage
            .locator('#apply_label');


        await applyBtn.click();
    }
    async Filter2() {

        console.log("Page closed:", this.page.isClosed());

        for (const frame of this.page.frames()) {
            console.log("Frame:", frame.name());
        }

        console.log("Filter count:", await this.filter.count());

        await this.filter.click();

        console.log("Filter clicked");
    }
    async kitchenservice() {

        await this.sent.click();
        await this.Accept.click();
        await this.commonActions.Constraintspopup();
        console.log("Constraint save  clicked");

        await this.home.navigateToKitchen();
        await this.commonActions.closeUnacknowledgedpopup();
        await this.AcceptStatus.click();
        console.log("AcceptStatus")
        await this.ChangeReq.click();
        console.log("ChangeReq")
        await this.ChangeReqEditIcon.click();
        console.log("ChangeReqEditIcon")
        await this.CloseBtn.click();
        console.log("CloseBtn")
        await this.QuantificationLink.click();
        await this.QuntifyAll.click();

        console.log("Quntify All clicked");

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

            //await this.PrepItemUnitDropdown.click();

            //await this.PrepItemUnitOption.first().click();

            //await this.Save.click();

            console.log("Prep Item Unit selected and saved");

            await this.QuntifyAll.click();

            console.log("Quntify All clicked again");
        }

        // Remaining flow continues here
        console.log("Continue remaining flow...");

        await this.GatherAll.click();
        console.log("GatherAll");

        await this.home.navigateToKitchen();
        await this.commonActions.closeUnacknowledgedpopup();
        await this.AcceptStatus.click();
        console.log("AcceptStatus")
        try {

            const dialogPromise = this.page.waitForEvent('dialog', {
                timeout: 5000
            });

            await this.Bill.click();

            const dialog = await dialogPromise;

            console.log(dialog.message());

            await dialog.accept();

        } catch {

            throw new Error(
                "Expected alert was not displayed after clicking Bill"
            );
        }
        await this.home.navigateToKitchen();
        await this.commonActions.closeUnacknowledgedpopup();
    }

}