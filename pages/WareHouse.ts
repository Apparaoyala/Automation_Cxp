
import { Page, Locator, expect } from '@playwright/test';
import { FrameManager } from '../Utilities/FrameManager';
import { CommonActions } from '../Utilities/CommonActions';
import { Home } from '../pages/Home';
import { HomePage } from '../pages/HomePage';
export class WareHouse {
    private readonly page: Page;
    private readonly commonActions: CommonActions;
    private readonly home: Home;
    private readonly sentLink: Locator;
    private readonly AcceptBtn: Locator;
    private readonly BillBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        const frameManager = new FrameManager(page);
        this.commonActions = new CommonActions(page);
        this.home = new Home(page);
        this.sentLink = page.frameLocator('frame[name="right"]').locator('td[title="Alcohol"] a');
        this.AcceptBtn = page.frameLocator('frame[name="right"]').getByRole('button', { name: 'Accept' });
       // this.BillBtn = page.frameLocator('frame[name="right"]').getByRole('button', { name: 'Bill' });
       this.BillBtn=page.frameLocator('frame[name="right"]').locator("//span[text()='Bill']");



    }


    async Warehouse_Alc() {

        await this.sentLink.click();
        await this.AcceptBtn.click();

   
      console.log("AcceptStatus")
       await this.commonActions.clickBillAndAcceptAlerts(this.BillBtn);
    }

}