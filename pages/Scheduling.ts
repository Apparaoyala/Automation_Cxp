
import { Page, Locator, expect } from '@playwright/test';
import { FrameManager } from '../Utilities/FrameManager';
import { CommonActions } from '../Utilities/CommonActions';
import { Home } from '../pages/Home';
export class Scheduling {


    private readonly page: Page;
    private readonly commonActions: CommonActions;
    private readonly home: Home;
    private readonly SentBtn: Locator;
    private readonly Acceptbtn: Locator;
    private readonly ShowWorker: Locator;
    private readonly popupIcon: Locator;
    //private readonly GoBtn: Locator;
    // private readonly CheckBox: Locator;
    private readonly BillBtn: Locator;
    // private readonly save: Locator;
    private readonly ClickAcceptStatus: Locator;
    private readonly PostSchedule: Locator;
    // private readonly rightFrame: Locator;
    // private readonly commonActions: Locator;
//private readonly acceptLink: Locator;




    constructor(page: Page) {
        this.page = page

        const frameManager = new FrameManager(page);
        this.commonActions = new CommonActions(page);
        this.home = new Home(page);
        this.SentBtn = this.page.frameLocator('frame[name="right"]').getByRole('link', { name: 'Sent' });
        this.Acceptbtn = this.page.frameLocator('frame[name="right"]').locator('#accept_label');
   //       this.PostSchedule1 = this.page.frameLocator('frame[name="header"]').getByRole('link', { name: 'Post Schedules', exact: true });

        this.PostSchedule = this.page.frameLocator('frame[name="header"]').getByRole('link', { name: 'Post Schedules' });
        this.ClickAcceptStatus = this.page.frameLocator('frame[name="right"]').getByRole('link', { name: 'Accpt', exact: true });
        this.popupIcon = this.page.frameLocator('frame[name="prsnlrequest"]').locator('img[src*="dhtml_popup.gif"]').first();

        this.ShowWorker = this.page.frameLocator('frame[name="prsnlrequest"]').getByRole('link', { name: 'Show Workers' });

        this.BillBtn = this.page.frameLocator('frame[name="view"]').locator('#billStatus_label').first();

    }

    async SchedulingAck() {
 

       await this.SentBtn.click();
        await this.Acceptbtn.click();
       await this.commonActions.Constraintspopup();
        console.log("Constraint save  clicked");
       await this.home.navigateToScheduling();
        await this.commonActions.closeUnacknowledgedpopup();
        await this.ClickAcceptStatus.click();
        console.log("AcceptStatus");
 
const frame = this.page.frameLocator('frame[name="prsnlrequest"]');

const popupIcon = frame
    .locator('img[src*="dhtml_popup.gif"]')
    .first();

await popupIcon.scrollIntoViewIfNeeded();

const box = await popupIcon.boundingBox();

if (!box) {
    throw new Error("Popup icon not found");
}

const x = box.x + box.width / 2;
const y = box.y + box.height / 2;

console.log("Moving mouse to:", x, y);

await this.page.mouse.move(x, y);

await this.page.waitForTimeout(2000);

const menu = frame.locator('#popmenu');

console.log("Popmenu visible:", await menu.isVisible());

if (!(await menu.isVisible())) {
    throw new Error("Popup menu was not displayed after mouse over");
}

console.log("Popmenu is visible");

await this.ShowWorker.click();

console.log("ShowWorker");

await this.commonActions.Show_workers_childwindow();
console.log("ShowWorker screen closed");
 
     await this.PostSchedule.click();
 await this.commonActions.clickBillAndAcceptAlerts(this.BillBtn);
      console.log("Scheduling bill completed");
 
    }




  
}


