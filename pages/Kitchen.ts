import { Page, Locator } from '@playwright/test';
export class Kitchen {

 private readonly page: Page;

    private readonly Kitchen: Locator;
    private readonly Kitchen: Locator;


constructor(page: Page) {

        this.page = page;


               this.Kitchen= page.getByRole('button', { name: 'Event Listing' });
             this.Kitchen = page.locator('span').filter({ hasText: 'Create Event' }).first();




}


async CreateEvent() {

     await this.Kitchen.click();
     
    }
}