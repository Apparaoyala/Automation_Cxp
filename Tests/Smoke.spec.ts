import { test } from '@playwright/test';
import { Login } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import {LoginHelper } from '../pages/LoginHelper';
import { TestConfig } from '../Utilities/Test.Config';
import { expect } from '@playwright/test';
import { commonActions } from '../Utilities/CommonActions';
import { JsonUtil } from '../Utilities/JsonUtil';
import { ChangeRequests } from '../pages/ChangeRequests';

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

const customers = JsonUtil.readJson(
    './Utilities/TestData/Customer.json'
    );
    const contacts = JsonUtil.readJson(
    './Utilities/TestData/Contact.json'
  );
  const Events = JsonUtil.readJson(
    './Utilities/TestData/Event.json'
);
if (
    customers.length !== contacts.length ||
    customers.length !== Events.length
) {
    throw new Error(
        "Customer, Contact and Event record count mismatch"
    );
}

for (let i = 0; i < customers.length; i++) {

    const customerData = customers[i];
    const contactData = contacts[i];
    const eventData = Events[i];

    test(
        `Smoke Run ${i + 1}`,
        async ({ page }) =>{

    test.setTimeout(1800000);
    const config = new TestConfig();
    console.log("APP_URL =", process.env.APP_URL);
console.log("CONFIG_URL =", config.appUrl);


    const event = new Event(page);
    const billworksheet = new BillWorksheet(page);
    const services = new Services(page);
    const estimate = new Estimate(page);
    const login = new Login(page);
    const homePage = new HomePage(page);
    const CommonActions = new commonActions(page);
     const changeRequests = new ChangeRequests(page);

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
     

    await mandatoryfieldutil.getMandatoryFieldCount(customerData);

   await customer.createCusBtn();
 
   await customer.handleDuplicateCustomerPopup();



});


await test.step("Create Contact", async () => {
    
    
  await contact.waitForContactScreen();

  

    await mandatoryFieldsContactUtil.getMandatoryFieldCount1(contactData);


    await contact.createContactBtn();

    await contact.createEventIcon();


});

await test.step("Create Event", async () => {
    await page.locator("ngx-spinner .overlay").waitFor({
    state: "hidden",
    timeout: 30000
});


await page.waitForTimeout(3000);

console.log("Labels After 5 Seconds:",
    await page.locator("label").count());

    await page.locator("ngx-spinner .overlay").waitFor({
    state: "hidden",
    timeout: 180000
});
await page.waitForTimeout(500);


await mandatoryfieldseventutil.getMandatoryFieldCount(eventData);


await event.createbtn();

const eventNumber = await event.getCreatedEventNumber();

console.log(eventNumber);

await CommonActions.closeCommonPopup();

});


// await test.step("Servicess", async () => {
   
//     //Menu Service

// await services.openMenuService();

// await services.searchandAdd();

// await services.filterICon();

// await services.goButton();


// //await services.itemSelectBox();

// await services.processServiceRows();


// await services.saveBtn();

// await services.closeBtn();
// await services.processFinalizeWorkflow();

// await services.serviceCloseBtn();
// await services.menuServiceStatus();
// //Sch Service
// await services.openSchService();

// //Alc Service
// await services.AllServiceStatuses();
// await services.openAlcService();

// await services.AlcServiceStatus();

// await services.EquipService();


// });

// await test.step("EstimateService", async () => {

//     await estimate.EstimateService();
//     await estimate.handleEstimateScreen();
// });

// await test.step("BillService", async () => {

// await billworksheet.openbillService();
// await billworksheet.BillProcess();

// //const estimateTotal = await estimate.TotalEstimate();

// //await billworksheet.BillValue(estimateTotal);

// });
// await test.step("ChangeRequest", async () => {
// await changeRequests.MenuChangeRequest();
// await changeRequests.MChangeRequest();
// await changeRequests.addEditItems();
// });
        

});
}