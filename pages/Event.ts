import { Page, Locator } from '@playwright/test';

export class Event {

    private readonly page: Page;
    private readonly Event: Locator;
    private readonly Menu: Locator;
   
private readonly CreateEventBtn: Locator;

    
    

    constructor(page: Page) {

        this.page = page;

        this.Event = page.locator('span').filter({ hasText: 'Create Event' }).first()
        this.Menu =page.getByText('menu', { exact: true }).first();
       
       

      
this. CreateEventBtn =
    page.getByRole('button', { name: 'Create Event' });
    }

    async Menu1() {

    await this.Menu.waitFor({
        state: 'visible',
        timeout: 180000
    });

    await this.Menu.click();
}



async CreateEvent() {

    await this.customerMenu.waitFor({
        state: 'visible',
        timeout: 180000
    });

    await this.customerMenu.click();
}
async CustomerBtn(){
     await this.newCustomerButton.waitFor({
        state: 'visible',
        timeout: 180000
    });
await this.newCustomerButton.click();

}


}