import { Page, Locator } from '@playwright/test';

export class Customer {

    private readonly page: Page;
    private readonly Customer: Locator;
    private readonly Menu: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    //private readonly HomeButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.Customer = page.locator('span').filter({ hasText: 'Customer' }).first()
        this.Menu =page.getByText('menu', { exact: true }).first();
        this.password = page.locator('#Password');
        this.loginButton = page.locator('input[type="image"]');
       // this.HomeButton =page.frameLocator('[name="header"]').locator("img[title='Home']");

    }

    async Menu1() {

       
        await this.Menu.click();
       // await this.HomeButton.click();

    }

//    async home() {
//    // await this.HomeButton.waitFor({ state: 'visible', timeout: 60000 });
//    await this.page.locator('.spinner').waitFor({
//     state: 'hidden'
// });
//     await this.HomeButton.click();
// }
}