import { Page, Locator } from '@playwright/test';

export class Event {

    private readonly page: Page;
    private readonly Event: Locator;
    private readonly clickFilter: Locator;
    private readonly EventDashBoard: Locator;
    private readonly ServiceRequest: Locator;

   // private readonly EnterEventNum: Locator;
   
private readonly CreateEventBtn: Locator;

    constructor(page: Page) {

        this.page = page;

        this.Event = page.locator('span').filter({ hasText: 'Create Event' }).first()
       this.CreateEventBtn= page.getByRole('button', { name: 'Create' })
       this .EventDashBoard=page.locator('span').filter({ hasText: 'dashboard' }).first()

       this.clickFilter=page.getByRole('searchbox', { name: 'Event #' })
       this.ServiceRequest= page.getByText('Service Request')
//this.EnterEventNum=page.getByRole('textbox', { name: 'Event #' })
       }

async CreateEvent() {

     await this.Event.click();
     
    }

    async createbtn(){
        await this.CreateEventBtn.click();
    }


    async clickFilter1() {

     await this.clickFilter.fill('3410');
     
    }
    async enterEventNumber() {

    await this.clickFilter.click(); 
     
    }
   async eventDashBoard(){
 await this.EventDashBoard.click();
    }
    async clickSearch() {

     await this.Event.click();
     
    }
    async openDashboard() {

     await this.Event.click();
     
    }

    async serviceRequest() {

     await this.ServiceRequest.click();
     
    }

    async getCreatedEventNumber(): Promise<string> {

    const eventNumberLocator = this.page.locator(
        "//label[text()=' Event # ']//following-sibling::label[2]"
    );

    await eventNumberLocator.waitFor({
        state: "visible",
        timeout: 30000
    });

    let eventId = "";

    for (let i = 0; i < 10; i++) {

        eventId = (await eventNumberLocator.textContent())?.trim() ?? "";

        if (eventId !== "") {
            break;
        }

        await this.page.waitForTimeout(300);
    }

    console.log("Created Event Number:", eventId);

    return eventId;

}

async openEventDashboard() {
     console.log("openEventDashboard");

    await this.clickFilter1();

   // await this.enterEventNumber();

   // await this.clickSearch();

   // await this.openDashboard();
}
}
