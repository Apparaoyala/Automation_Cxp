import { test, expect,Page  } from '@playwright/test';
import { Login } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import { Customer } from '../pages/Customer';

import { TestConfig } from '../Utilities/Test.Config';
import { log } from 'node:console';

const config = new TestConfig();

test('authenticate', async ({ page }) => {
    test.setTimeout(180000);

    const login = new Login(page);
    const homePage = new HomePage(page);
const customer = new Customer(page);
    await page.goto(config.appUrl);

    await login.login(
         config.Caterid,
        config.UserId,
        config.password
    );
    // await page.waitForLoadState('networkidle');

    // OR wait for dashboard element
  await page.frameLocator('[name="header"]').getByText('Superadmin Login', { exact: true })
    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
    console.log("login")

   
    await homePage.clickHome();

   console.log("Beofre sales New")

   
await homePage.navigateToModule("Sales New");
 console.log("Sales New")


await customer.Menu1();
//await page.pause();
await customer.clickCustomer();
await page.pause();


await customer.CustomerBtn();


}
);
