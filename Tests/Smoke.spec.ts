import { test } from '@playwright/test';
import { Login } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import {LoginHelper } from '../pages/LoginHelper';
import { TestConfig } from '../Utilities/Test.Config';
import { expect } from '@playwright/test';
import { commonActions } from '../Utilities/CommonActions';
import { JsonUtil } from '../Utilities/JsonUtil';
import { Event } from '../pages/Event';
import { Services } from '../pages/Services';
import { Customer } from '../pages/Customer';
import { Estimate } from '../pages/Estimate';
import { BillWorksheet } from '../pages/BillWorksheet';
import { MandatoryFieldsEventUtil } from '../Utilities/MandatoryFieldsEventUtil';
import { MandatoryFieldsContactUtil } from '../Utilities/MandatoryFieldsContactUtil';

import { MandatoryFieldUtil } from '../Utilities/MandatoryFieldUtil';

import { ExcelUtil } from '../Utilities/ExcelUtil';
import { Contact } from '../pages/Contact';




test('Smoke Test - Login Flow', async ({ page }) => {

    test.setTimeout(1800000);
    const config = new TestConfig();
    const event = new Event(page);
    const billworksheet = new BillWorksheet(page);
    const services = new Services(page);
    const estimate = new Estimate(page);
    const login = new Login(page);
    const homePage = new HomePage(page);
    const CommonActions = new commonActions(page);
    const loginelper = new LoginHelper();
    const customer = new Customer(page);
    const contact = new Contact(page);
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

await test.step("Create Customer", async () => {
    await customer.Menu1();
    await customer.clickCustomer();

    await customer.CustomerBtn();
    await page.waitForTimeout(3000);
     const customerData = JsonUtil.readJson(
    './Utilities/TestData/Customer.json'
    );

    await mandatoryfieldutil.getMandatoryFieldCount(customerData);

   await customer.createCusBtn();
   console.log("Customer created successfully");
   await customer.handleDuplicateCustomerPopup();
   console.log(" successfully executed");


});


await test.step("Create Contact", async () => {
    
    

  const contactData = JsonUtil.readJson(
    './Utilities/TestData/Contact.json'
  );
  console.log(contactData);

    await mandatoryFieldsContactUtil.getMandatoryFieldCount1(contactData);


    await contact.createContactBtn();

    await contact.createEventIcon();


});

await test.step("Create Event", async () => {
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
);


await page.waitForTimeout(3000);

console.log("Labels After 5 Seconds:",
    await page.locator("label").count());

    await page.locator("ngx-spinner .overlay").waitFor({
    state: "hidden",
    timeout: 180000
});
await page.waitForTimeout(500);
await mandatoryfieldseventutil.getMandatoryFieldCount(EventData);


await event.createbtn();

const eventNumber = await event.getCreatedEventNumber();

console.log(eventNumber);

await CommonActions.closeCommonPopup();

});


await test.step("Servicess", async () => {
    //Menu Service
console.log("Sales Menu service complete");
await services.openMenuService();
console.log("Open MEnu service");

await services.searchandAdd();
console.log("search and add clikc");
await services.filterICon();
console.log("filter working");
await services.goButton();
console.log("go button working");
console.log(
  await page.locator('div.p-checkbox.p-component')
            .locator('div')
            .count()
);
await services.itemSelectBox();
console.log("items are select");
await services.saveBtn();
console.log("save working");
await services.closeBtn();
await services.finalizeBtn();
await services.serviceCloseBtn();
await services.menuServiceStatus();
//Sch Service
await services.openSchService();

//Alc Service
await services.AllServiceStatuses();
await services.openAlcService();

await services.AlcServiceStatus();

await services.EquipService();

console.log("Equp working");
});

await test.step("EstimateService", async () => {

    await estimate.EstimateService();
console.log("Estimate service working");
await estimate.EstimateValues();
console.log("Estimate values working");
await estimate.TotalEstimate();
console.log("Total Estimate values working");
});



await test.step("BillService", async () => {

await billworksheet.openbillService();
await billworksheet.BillProcess();
const estimateTotal = await estimate.TotalEstimate();

await billworksheet.BillValue(estimateTotal);

});
await page.pause();


});