import { test, expect, Page } from '@playwright/test';
import { Login } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import { Customer } from '../pages/Customer';
import { Event } from '../pages/Event';
import { MandatoryFieldsEventUtil } from '../Utilities/MandatoryFieldsEventUtil';
import { commonActions } from '../Utilities/CommonActions';
//import { MandatoryFieldUtil } from '../Utilities/MandatoryFieldUtil';
import { TestConfig } from '../Utilities/Test.Config';
import { ExcelUtil } from '../Utilities/ExcelUtil';

const config = new TestConfig();

test('authenticate', async ({ page }) => {

    test.setTimeout(180000);

    const login = new Login(page);
    const homePage = new HomePage(page);
    const customer = new Customer(page);
    const event = new Event(page);
    const CommonActions = new commonActions(page);
    //const mandatoryfieldutil = new MandatoryFieldUtil(page);
    const mandatoryfieldseventutil = new MandatoryFieldsEventUtil(page);

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


    await homePage.navigateToModule("Sales New");


    console.log("Sales New navigation complete");
   

    //await page.pause();
await CommonActions.closeInventoryPopup();
    await customer.Menu1();

//start customer creation---------------------------------------
/*
    await customer.clickCustomer();

    //await page.pause();
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

*/



//event creation --------------------------------------

await event.CreateEvent();



await page.locator("ngx-spinner .overlay").waitFor({
    state: "hidden",
    timeout: 60000
});


// console.log(
//     "Labels:",
//     await page.locator("label").count()
// );

console.log(
    "Mandatory:",
    await page.locator("label span.text-danger").count()
);
await page.screenshot({ path: "createevent.png", fullPage: true });




const excelData = ExcelUtil.readExcel(
    './Utilities/TestData/Customer.xlsx',
    'Sheet2'
);

// console.log("Labels Before Waiting:",
//     await page.locator("label").count());

await page.waitForTimeout(5000);

console.log("Labels After 5 Seconds:",
    await page.locator("label").count());

    await page.locator("ngx-spinner .overlay").waitFor({
    state: "hidden",
    timeout: 180000
});
await page.waitForTimeout(2000);
await mandatoryfieldseventutil.getMandatoryFieldCount(excelData);

//await page.pause();
await event.createbtn();

const eventNumber = await event.getCreatedEventNumber();

console.log(eventNumber);

//await CommonActions.closeInventoryPopup();

await page.pause();
});