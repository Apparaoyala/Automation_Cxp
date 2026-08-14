import { test, expect, Page } from '@playwright/test';
import { Login } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import { Customer } from '../pages/Customer';
import { Event } from '../pages/Event';
import { ChangeRequests } from '../pages/ChangeRequests';
import { Services } from '../pages/Services';
import { Estimate } from '../pages/Estimate';
import { BillWorksheet } from '../pages/BillWorksheet';

import { MandatoryFieldsEventUtil } from '../Utilities/MandatoryFieldsEventUtil';
import { commonActions } from '../Utilities/CommonActions';
//import { MandatoryFieldUtil } from '../Utilities/MandatoryFieldUtil';
import { TestConfig } from '../Utilities/Test.Config';
import { JsonUtil } from '../Utilities/JsonUtil';
const config = new TestConfig();

test('authenticate', async ({ page }) => {

    test.setTimeout(1800000);

    const login = new Login(page);
    const homePage = new HomePage(page);
    const customer = new Customer(page);
    const event = new Event(page);
    const estimate = new Estimate(page);
        const billworksheet = new BillWorksheet(page);
 const changeRequests = new ChangeRequests(page);
    const services = new Services(page);
    const CommonActions = new commonActions(page);
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

   

    await homePage.clickHome();


    await homePage.navigateToModule("Sales New");


    console.log("Sales New navigation complete");
   

await CommonActions.closeCommonPopup();
   await customer.Menu1();


//---------------------------------------------------event creation --------------------------------------


/*
await event.CreateEvent();



await page.locator("ngx-spinner .overlay").waitFor({
    state: "hidden",
    timeout: 30000
});




console.log(
    "Mandatory:",
    await page.locator("label span.text-danger").count()
);
await page.screenshot({ path: "createevent.png", fullPage: true });


const EventData = JsonUtil.readJson(
    './Utilities/TestData/Event.json'
)[0];


await page.waitForTimeout(3000);

console.log("Labels After 5 Seconds:",
    await page.locator("label").count());

    await page.locator("ngx-spinner .overlay").waitFor({
    state: "hidden",
    timeout: 180000
});
await page.waitForTimeout(500);
await mandatoryfieldseventutil.getMandatoryFieldCount(EventData);

//await page.pause();
await event.createbtn();

const eventNumber = await event.getCreatedEventNumber();

console.log(eventNumber);
*/
await CommonActions.closeCommonPopup();

await event.EventFilter();

console.log("Event dashBoard is displayed");


//Menu Service

//await services.openMenuService();


//await services.searchandAdd();

//await services.filterICon();
//console.log("filter working");
//await services.goButton();

//await services.itemSelectBox();

//wait services.processServiceRows();
//await services.saveBtn();
//console.log("save working");
//await services.closeBtn();


// await services.processFinalizeWorkflow();


// await services.serviceCloseBtn();
// await services.menuServiceStatus();

//  await services.AllServiceStatuses();
//  await services.openAlcService();

//  await services.AlcServiceStatus();

//  await services.EquipService();



//await services.openSchService();



// await estimate.EstimateService();
// await estimate.handleEstimateScreen();
await changeRequests.MenuChangeRequest();
await changeRequests.MChangeRequest();
await changeRequests.addEditItems();
await test.step("BillService", async () => {

//await billworksheet.openbillService();
//await billworksheet.BillProcess();
//const estimateTotal = await estimate.TotalEstimate();

//await billworksheet.BillValue(estimateTotal);


});

});