import { test as setup } from '@playwright/test';
import { Login } from '../pages/Login';
import { TestConfig } from '../Utilities/Test.Config';

const config = new TestConfig();

setup('authenticate', async ({ page }) => {

    const loginPage = new Login(page);

    await page.goto(config.appUrl);

    await loginPage.login(
        config.Caterid,
        config.UserId,
        config.password
    );

    await page.waitForLoadState('networkidle');

    await page.locator('#headerTitle').waitFor();

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});