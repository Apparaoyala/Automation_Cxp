import { Page, Locator } from '@playwright/test';

export class Customer {

    private readonly page: Page;
    private readonly Customer: Locator;
    private readonly Menu: Locator;
    private readonly customerMenu: Locator;
private readonly newCustomerButton: Locator;
    
    //private readonly HomeButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.Customer = page.locator('span').filter({ hasText: 'Customer' }).first()
        this.Menu =page.getByText('menu', { exact: true }).first();
       
       // this.HomeButton =page.frameLocator('[name="header"]').locator("img[title='Home']");

       this.customerMenu = page.locator(
        //'a[href="#/sales-sub/customer-listing"]'
       // span[normalize-space()='Customer/Potential Customer']
       // page.locator('a[href="#/sales/customerListing"]')
       "//div[@id = 'sidebarMain']//span[text()='Customer' or text()='Customer/Potential Customer']"
    );
this. newCustomerButton =
    page.getByRole('button', { name: 'New Customer' });
    }

    async Menu1() {

    await this.Menu.waitFor({
        state: 'visible',
        timeout: 180000
    });

    await this.Menu.click();
}

//    async home() {
//    // await this.HomeButton.waitFor({ state: 'visible', timeout: 60000 });
//    await this.page.locator('.spinner').waitFor({
//     state: 'hidden'
// });
//     await this.HomeButton.click();
// }

async clickCustomer() {

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