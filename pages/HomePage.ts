import { Page, Locator } from '@playwright/test';

export class HomePage {

    private readonly page: Page;
    private readonly HomeButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.HomeButton = page
            .frameLocator('[name="header"]')
            .locator("img[title='Home']");
    }

    async clickHome(){

        await this.page.locator('.spinner')
            .waitFor({ state: 'hidden' });

        await this.HomeButton.click();
    }

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
}