import { test } from '@playwright/test';
import { LoginHelper } from '../pages/LoginHelper';

test.skip('authenticate', async ({ page }) => {

    await LoginHelper.login(page);

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });

});