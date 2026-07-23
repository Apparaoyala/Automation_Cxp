import { test, expect, Page } from '@playwright/test';
import { Login } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import { Customer } from '../pages/Customer';
import { commonActions } from '../Utilities/CommonActions';
import { MandatoryFieldUtil } from '../Utilities/MandatoryFieldUtil';
import { MandatoryFieldsContactUtil } from '../Utilities/MandatoryFieldsContactUtil';

import { TestConfig } from '../Utilities/Test.Config';
import { ExcelUtil } from '../Utilities/ExcelUtil';
import { JsonUtil } from '../Utilities/JsonUtil';
import {LoginHelper } from '../pages/LoginHelper';


const config = new TestConfig();

test('authenticate', async ({ page }) => {

    test.setTimeout(1800000);

    const login = new Login(page);
    const homePage = new HomePage(page);
    const customer = new Customer(page);
    const mandatoryfieldutil = new MandatoryFieldUtil(page);
const CommonActions = new commonActions(page);
const loginelper = new LoginHelper();
    const mandatoryFieldsContactUtil = new MandatoryFieldsContactUtil(page);

    // await page.goto(config.appUrl);

    // await login.login(
    //     config.Caterid,
    //     config.UserId,
    //     config.password
    // );
    await LoginHelper.login(page);

    await page
        .frameLocator('[name="header"]')
        .getByText('Superadmin Login', { exact: true });

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });

    console.log("login success");

    await homePage.clickHome();


    await homePage.navigateToModule("Sales New");

    console.log("Sales New navigation complete");

    await CommonActions.closeCommonPopup();
    // await page.pause();
    await customer.Menu1();

    await customer.clickCustomer();

   
await page.waitForTimeout(3000);
    await customer.CustomerBtn();
await page.waitForTimeout(3000);

const customerData = JsonUtil.readJson(
    './Utilities/TestData/Customer.json'
);

console.log(customerData);

console.log("Customer Name :", customerData["Customer Name"]);
console.log("First Name :", customerData["First Name"]);
console.log("State :", customerData["State"]);
console.log("Business Units :", customerData["Business Units"]);

await mandatoryfieldutil.getMandatoryFieldCount(customerData);
   
  

   await customer.createCusBtn();
   console.log("Customer created successfully");
//await page.pause();
await customer.handleDuplicateCustomerPopup();
   console.log(" successfully executed");







//await page.pause();
   //contact
  const contactData = JsonUtil.readJson(
    './Utilities/TestData/Contact.json'
);


console.log(contactData);

await mandatoryFieldsContactUtil.getMandatoryFieldCount1(contactData);

await customer.createCusBtn();
    
    await page.pause();


});