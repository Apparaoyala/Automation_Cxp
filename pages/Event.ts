import { Page, Locator } from '@playwright/test';

export class Event {

    private readonly page: Page;
    private readonly Event: Locator;
    
   
//private readonly CreateEventBtn: Locator;

    constructor(page: Page) {

        this.page = page;

        this.Event = page.locator('span').filter({ hasText: 'Create Event' }).first()
       
       }

async CreateEvent() {

     await this.Event.click();
    }

    
}
