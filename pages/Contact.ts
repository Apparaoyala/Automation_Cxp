import { Page, Locator,expect} from '@playwright/test';
export class Contact{

 private readonly page: Page;
private readonly CreateCusBtn: Locator;
private readonly EventIcon :Locator;

constructor(page: Page) {
     this.page = page;

     this.CreateCusBtn= page.getByRole('button', { name: 'Create' });
       this.EventIcon= page.locator(
  "//span[contains(@class,'material-symbols-outlined') and normalize-space()='event']"
);
}

async createContactBtn(){
       await this.CreateCusBtn.click();
}
async createEventIcon(){
      
       await this.EventIcon.click();
}

async waitForCustomerScreen() {
    await expect.poll(async () => {
        return await this.page.locator(
            "//label[.//span[contains(@class,'text-danger')]]"
        ).count();
    }, {
        timeout: 20000,
        message: "Waiting for Customer mandatory fields to load"
    }).toBeGreaterThan(6);
}
async waitForContactScreen() {await expect.poll(async () => {

        return await this.page.locator(
            "//div[@role='tabpanel' and @aria-hidden='false']//label[.//span[contains(@class,'text-danger')]]"
        ).count();

    }, {
        timeout: 20000
    }).toBeGreaterThan(6);}
}