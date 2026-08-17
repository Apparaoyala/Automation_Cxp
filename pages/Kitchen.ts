import { Page, Locator } from '@playwright/test';
import { FrameManager } from '../Utilities/FrameManager';
export class Kitchen {

 private readonly page: Page;

    private readonly sent: Locator;
    private readonly Accept: Locator;
    private readonly GatherAll: Locator;
    private readonly QuntifyAl: Locator;
    private readonly CloseBtn: Locator;
    private readonly Ack: Locator;
    private readonly Bill: Locator;
    private readonly ChangeReq: Locator;
    private readonly ChangeReqEditIcon: Locator;
    private readonly ChangeReqAccept: Locator;
    


constructor(page: Page) {

        this.page = page;
const frameManager = new FrameManager(page);

               this.Kitchen= page.getByRole('button', { name: 'Event Listing' });
             this.Kitchen = page.locator('span').filter({ hasText: 'Create Event' }).first();




}


async CreateEvent() {

     await this.Kitchen.click();
     
    }






}