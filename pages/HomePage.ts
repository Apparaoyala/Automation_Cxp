import { Page, Locator } from '@playwright/test';

export class HomePage {

    private readonly page: Page;
    private readonly HomeButton: Locator;
    private readonly BaseNavigation: Locator;

    constructor(page: Page) {

        this.page = page;

        this.HomeButton = page
            .frameLocator('[name="header"]')
            .locator("img[title='Home']");

            this.BaseNavigation=page.locator('span').filter({ hasText: 'dining' });
    }

    async clickHome(){

        await this.page.locator('.spinner')
            .waitFor({ state: 'hidden' });

        await this.HomeButton.click();
    }
/*
    async navigateToModule(moduleName: string) {

    const moduleLink = this.page
        .frameLocator('[name="right"]')
        .getByRole('link', { name: moduleName });

    await moduleLink.waitFor({
        state: 'visible',
        timeout: 180000
    });

    await moduleLink.click();
}
    */
   async navigateToModule(moduleName: string) {

    const moduleLink = this.page
        .frameLocator('[name="right"]')
        .getByRole('link', { name: moduleName });

    await moduleLink.waitFor({
        state: "visible",
        timeout: 180000
    });

    await moduleLink.click();

    // Wait until all loading spinners disappear
    await this.page.locator("ngx-spinner")
        .waitFor({
            state: "hidden",
            timeout: 60000
        })
        .catch(() => {});

    // Small stabilization delay for Angular rendering
    await this.page.waitForLoadState("networkidle");

    console.log(`${moduleName} page loaded.`);
}
async baseNavigation(){
     await this. BaseNavigation.click();
}
}