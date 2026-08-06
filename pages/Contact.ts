import { Page, Locator } from '@playwright/test';
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
}