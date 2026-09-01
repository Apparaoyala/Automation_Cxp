import { test, expect } from '@playwright/test';

test.use({
    storageState: 'playwright/.auth/user.json'
});

test.skip('Run with saved authentication', async ({ page }) => {

    console.log('Loaded cookies:',
        await page.context().cookies()
    );

    console.log(
        'LocalStorage will be loaded from user.json'
    );
    console.log(
    "Loaded storage:",
    await page.context().storageState()
);

    await page.goto(
        'https://testapps.aquilasoftware.com/CaterXpertSales2026_0804HF2/resources/CaterXpertSales/CaterXpertSales.html#/sales/event-listing'
    );

    console.log('Current URL:', page.url());

    await page.pause();
});