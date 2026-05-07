import { test, expect,Page  } from '@playwright/test';
import { Login } from '../pages/Login';
import { TestConfig } from '../Test.config';

const config = new TestConfig();

setup('authenticate', async ({ page }) => {

    const login = new Login(page);

    await page.goto(config.appUrl);

    await login.login(
         config.Caterid,
        config.UserId,
        config.password
    );
     await page.waitForLoadState('networkidle');

    // OR wait for dashboard element
    await page.locator('#headerTitle').waitFor();
    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});