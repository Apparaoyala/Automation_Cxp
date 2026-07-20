import { test } from '@playwright/test';
import { Login } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import {LoginHelper } from '../pages/LoginHelper';
import { TestConfig } from '../Utilities/Test.Config';
import { expect } from '@playwright/test';
import { commonActions } from '../Utilities/CommonActions';
import { Customer } from '../pages/Customer';
import { MandatoryFieldsEventUtil } from '../Utilities/MandatoryFieldsEventUtil';
import { MandatoryFieldUtil } from '../Utilities/MandatoryFieldUtil';

import { ExcelUtil } from '../Utilities/ExcelUtil';




test('Smoke Test - Login Flow', async ({ page }) => {

    test.setTimeout(180000);
const config = new TestConfig();

    const login = new Login(page);
    const homePage = new HomePage(page);
    const CommonActions = new commonActions(page);
const loginelper = new LoginHelper();
    const customer = new Customer(page);
    const mandatoryfieldseventutil = new MandatoryFieldsEventUtil(page);
 const mandatoryfieldutil = new MandatoryFieldUtil(page);

    await test.step("Open Application", async () => {

        await page.goto(config.appUrl);

    });


    await test.step("Login into Application", async () => {

        await LoginHelper.login(page);
    });


    await test.step("Navigate to Sales New Module", async () => {

        await homePage.clickHome();

       await homePage.navigateToModule("Sales New");

    });
    
await test.step("Validate Sales New page", async () => {
await CommonActions.closeCommonPopup();

    await expect(
        page.getByText("Event Listing")
    ).toBeVisible();

});



await test.step("Create Customer", async () => {
 await customer.Menu1();

  await customer.clickCustomer();

    await page.pause();
await page.waitForTimeout(3000);

    await customer.CustomerBtn();
await page.waitForTimeout(3000);
const excelData = ExcelUtil.readExcel(
    './Utilities/TestData/Customer.xlsx',
    'Sheet1'
);

console.log(excelData);
console.log(excelData.get("Customer Name"));
console.log(excelData.get("Street"));
//await page.pause();
    await mandatoryfieldutil.getMandatoryFieldCount(excelData);

    await page.waitForTimeout(30000);
    //await mandatoryfieldutil.handleTextbox()
//await page.pause();
   //await mandatoryfieldutil.identifyControlType();

});


});