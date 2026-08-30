import { Page, Locator } from '@playwright/test';

import { Services } from './Services';
import { Customer } from './Customer';
import { Event } from './Event';

export class Approvals {


    private readonly page: Page;
    private readonly HamburgerMenu: Locator;
    private readonly SalesAdmin: Locator;
    private readonly Approval: Locator;
    private readonly SerachField: Locator;
    private readonly Go: Locator;
    private readonly save: Locator;
    private readonly close: Locator;
    private readonly clickFilter: Locator;
    private readonly EventDashBoard: Locator;
    private readonly DashBoard: Locator;
    constructor(page: Page) {

        const event1 = new Event(page);
        this.page = page;
        this.HamburgerMenu = page.getByText('menu', { exact: true }).first();
        this.SalesAdmin = page.locator("(//div[@id = 'sidebarMain']//span[text()='Sales Admin'])[1]")
        this.Approval = page.locator("//a[@href='#/sales/approval-inbox' and (@aria-expanded='false')]");

        this.SerachField = page.locator('input[type="search"]');
        this.Go = page.getByRole('button', { name: 'Go' });

        this.save = page.getByRole('button', {
            name: 'Save'
        })

        this.close = page.getByRole('button', {
            name: ' Close '
        })

        this.clickFilter = page.getByRole('searchbox', { name: 'Event #' })
        this.DashBoard = page
            .locator("//span[@ptooltip='Event Dashboard']")
            .first();

        this.EventDashBoard = page.locator('span').filter({ hasText: 'dashboard' }).first()


    }








    async Approvals(eventNumber: string) {


        await this.HamburgerMenu.waitFor({
            state: 'visible',
            timeout: 180000
        });

        await this.HamburgerMenu.click();


        await this.SalesAdmin.waitFor({
            state: 'visible',
            timeout: 180000
        });

        await this.SalesAdmin.scrollIntoViewIfNeeded();
        await this.SalesAdmin.click();
        await this.Approval.waitFor({
            state: "visible"
        });
        await this.Approval.click();

        await this.SerachField.fill(eventNumber);

        await this.Go.click();

        const pendingLinks = this.page.locator(
            'span.editid.cursor-pointer'
        );
        const count = await pendingLinks.count()
        console.log(count);

        while (await pendingLinks.count() > 0) {

            await pendingLinks.first().click();

            await this.save.click();

            await this.page.waitForLoadState('networkidle');
        }

        await this.close.click();

        await this.clickFilter.fill(eventNumber);

        await this.page.waitForTimeout(3000);
        await this.DashBoard.click();

    }
}





