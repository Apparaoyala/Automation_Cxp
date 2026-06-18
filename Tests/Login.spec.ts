import { test, expect, Page } from '@playwright/test';
import { Login } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import { Customer } from '../pages/Customer';
import { MandatoryFieldUtil } from '../Utilities/MandatoryFieldUtil';
import { TestConfig } from '../Utilities/Test.Config';
import { log } from 'node:console';

const config = new TestConfig();

test('authenticate', async ({ page }) => {

    test.setTimeout(180000);

    const login = new Login(page);
    const homePage = new HomePage(page);
    const customer = new Customer(page);
    const mandatoryfieldutil = new MandatoryFieldUtil(page);

    await page.goto(config.appUrl);

    await login.login(
        config.Caterid,
        config.UserId,
        config.password
    );

    await page
        .frameLocator('[name="header"]')
        .getByText('Superadmin Login', { exact: true });

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });

    console.log("login success");

    await homePage.clickHome();

    console.log("home page");

    await homePage.navigateToModule("Sales New");

    console.log("Sales New navigation complete");

    await customer.Menu1();

    await customer.clickCustomer();

    await page.pause();

    await customer.CustomerBtn();

    await mandatoryfieldutil.getMandatoryFieldCount();

    // await mandatoryfieldutil.identifyControlType();
});