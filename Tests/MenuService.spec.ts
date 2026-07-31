import { test } from '@playwright/test';
import { Login } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import {LoginHelper } from '../pages/LoginHelper';
import { TestConfig } from '../Utilities/Test.Config';
import { expect } from '@playwright/test';
import { commonActions } from '../Utilities/CommonActions';
import { JsonUtil } from '../Utilities/JsonUtil';
import { Event } from '../pages/Event';
import { Customer } from '../pages/Customer';
import { MandatoryFieldsEventUtil } from '../Utilities/MandatoryFieldsEventUtil';
import { MandatoryFieldsContactUtil } from '../Utilities/MandatoryFieldsContactUtil';

import { MandatoryFieldUtil } from '../Utilities/MandatoryFieldUtil';

import { ExcelUtil } from '../Utilities/ExcelUtil';




test('Menu service - Login Flow', async ({ page }) => {

    test.setTimeout(1800000);
const config = new TestConfig();

    const login = new Login(page);
    const homePage = new HomePage(page);
    const CommonActions = new commonActions(page);
const loginelper = new LoginHelper();
    const customer = new Customer(page);
    const event = new Event(page);
    const mandatoryfieldseventutil = new MandatoryFieldsEventUtil(page);
 const mandatoryfieldutil = new MandatoryFieldUtil(page);
 const mandatoryFieldsContactUtil = new MandatoryFieldsContactUtil(page);

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



await test.step("Menu", async () => {

    await event.openEventDashboard();
    console.log("openEventDashboard12");
    await event.eventDashBoard();

await page.pause();

//await event.serviceRequest();
console.log("Service reques click")
await event.openMenuService();
console.log("Service request click")

});




});