import { Page, Locator } from '@playwright/test';

export class DashBoard {

    private readonly page: Page;
    private readonly Caterid: Locator;
    private readonly Userid: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.Caterid = page.locator('#CatererId');
        this.Userid = page.locator('#UserName');
        this.password = page.locator('#Password');
        this.loginButton = page.locator('input[type="image"]');
    }

    async login(cater: string, users: string, passwords: string) {

        await this.Caterid.fill(cater);
        await this.Userid.fill(users);
        await this.password.fill(passwords);
        await this.loginButton.click();
    }
}