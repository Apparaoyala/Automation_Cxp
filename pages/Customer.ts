import { Page, Locator } from '@playwright/test';
 
export class Customer {
 
    private readonly page: Page;
    private readonly Customer: Locator;
    private readonly CustomerSubMenu: Locator;
    private readonly Menu: Locator;
    private readonly Clickcustomer: Locator;
private readonly newCustomerButton: Locator;
private readonly CreateCusBtn: Locator;
  private readonly Customer2: Locator;
 
   private readonly duplicatePopupOk :Locator;
   private readonly EventIcon :Locator;
 
    constructor(page: Page) {
 
        this.page = page;
 
        this.Customer = page.locator('span').filter({ hasText: 'Customer' }).first()
        this.Menu =page.getByText('menu', { exact: true }).first();
       this.CreateCusBtn= page.getByRole('button', { name: 'Create' })
       // this.HomeButton =page.frameLocator('[name="header"]').locator("img[title='Home']");

       this.Clickcustomer = page.locator(
        //'a[href="#/sales-sub/customer-listing"]'
       // span[normalize-space()='Customer/Potential Customer']
       // page.locator('a[href="#/sales/customerListing"]')
       "(//div[@id = 'sidebarMain']//span[text()='Customer' or text()='Customer/Potential Customer'])[1]"
   
   
    );
    this.CustomerSubMenu = page.locator("//a[@href='#/sales/customerListing' and (@aria-expanded='false')]");
    this.Customer2=page.locator("//a[@href='#/sales/customerListing' and (@aria-expanded='false')]");
this. newCustomerButton =
    page.getByRole('button', { name: 'New Customer' });

     this.duplicatePopupOk=page.getByRole('button', { name: 'OK' });

     this.EventIcon= page.locator(
  "//span[contains(@class,'material-symbols-outlined') and normalize-space()='event']"
);
    }
 
    async Menu1() {
 
    await this.Menu.waitFor({
        state: 'visible',
        timeout: 180000
    });
 
    await this.Menu.click();
}
/*
   async home() {
   // await this.HomeButton.waitFor({ state: 'visible', timeout: 60000 });
   await this.page.locator('.spinner').waitFor({
    state: 'hidden'
});
    await this.HomeButton.click();
}
*/
async clickCustomer() {
 
    await this.Clickcustomer.waitFor({
        state: 'visible',
        timeout: 180000
    });
 
    await this.Clickcustomer.click();
    await this.CustomerSubMenu.waitFor({
    state: "visible"
});
 
await this.CustomerSubMenu.click();
}
async CustomerBtn(){
     await this.newCustomerButton.waitFor({
        state: 'visible',
        timeout: 240000
    });
await this.newCustomerButton.click();
}
 
async createCusBtn(){
       await this.CreateCusBtn.click();

}
async createContactBtn(){
       await this.CreateCusBtn.click();
}
 async createEventIcon(){
       await this.EventIcon.click();
}
 async handleDuplicateCustomerPopup() {

      try {

        await this.page.getByRole('button', { name: 'Yes' }).waitFor({
            state: 'visible',
            timeout: 3000
        });

        console.log("Duplicate customer popup displayed");

        await this.page.getByRole('button', { name: 'Yes' }).click();
       // console.log(await this.page.viewportSize());
        await this.page.getByRole('button', { name: 'Yes' }).click();

    } catch {

        console.log("Duplicate customer popup not displayed");

    }
 }
 
/*
async getMandatoryFieldCount() {
 
    const mandatoryLabels = this.page.locator(
        "//label[.//span[contains(@class,'text-danger')]]"
    );
 
    const count = await mandatoryLabels.count();
   
   
 
    console.log("Mandatory Count :", count);
 
    for(let i = 0; i < count; i++) {
 
        const fieldName = await mandatoryLabels
            .nth(i)
            .textContent();
 
        console.log(`Field ${i + 1}: ${fieldName}`);
    }
}*/
 



}