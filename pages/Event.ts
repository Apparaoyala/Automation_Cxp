import { Page, Locator } from '@playwright/test';

export class Event {

    private readonly page: Page;
    private readonly Event: Locator;
    
   
private readonly CreateEventBtn: Locator;

    constructor(page: Page) {

        this.page = page;

        this.Event = page.locator('span').filter({ hasText: 'Create Event' }).first()
       this.CreateEventBtn= page.getByRole('button', { name: 'Create' })
       }

async CreateEvent() {

     await this.Event.click();
     
    }

    async createbtn(){
        await this.CreateEventBtn.click();
    }


    async getCreatedEventNumber(): Promise<string> {

    const eventNumber = await this.page
        .locator("//label[text()=' Event # ']//following-sibling::label[2]")
        .textContent();

    const eventId = eventNumber?.trim() ?? "";

    console.log("Created Event Number :", eventId);

    return eventId;
}
    
}
