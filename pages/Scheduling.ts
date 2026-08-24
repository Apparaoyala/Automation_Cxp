
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





    constructor(page: Page) {
        this.page = page

        const frameManager = new FrameManager(page);
        this.commonActions = new CommonActions(page);
        this.home = new Home(page);
        this.SentBtn = this.page.frameLocator('frame[name="right"]').getByRole('link', { name: 'Sent' });
        this.Acceptbtn = this.page.frameLocator('frame[name="right"]').locator('#accept_label');
   //       this.PostSchedule1 = this.page.frameLocator('frame[name="header"]').getByRole('link', { name: 'Post Schedules', exact: true });

        this.PostSchedule = this.page.frameLocator('frame[name="right"]').getByRole('link', { name: 'Post Schedules' });
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
        await this.ShowWorker.click();
        console.log("ShowWorker");
        await this.commonActions.Show_workers_childwindow();
 
 
        await this.PostSchedule.click();
 
        await this.BillBtn.click();
 
    }

     async SchedulingBill() {
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

const menu = frame.locator('#mouseoverstyle');

console.log("Popmenu count:", await menu.count());

if (await menu.count() > 0) {
    console.log("Popmenu visible:", await menu.isVisible());
}
        
        await this.PostSchedule.click();
        console.log("PostSchedule");
   
  await this.BillBtn.click();
console.log("Scheduling screen");

     }
}


