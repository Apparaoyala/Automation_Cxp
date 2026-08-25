import { test, expect, Page } from '@playwright/test';
import { Login } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import { Customer } from '../pages/Customer';
import { Event } from '../pages/Event';
import { KitchenService } from '../pages/Kitchen';
import { ChangeRequests } from '../pages/ChangeRequests';
import { Services } from '../pages/Services';
import { Estimate } from '../pages/Estimate';
import { Home } from '../pages/Home';
import { FrameManager } from '../Utilities/FrameManager';
import { BillWorksheet } from '../pages/BillWorksheet';
import { Approvals } from '../pages/Approval';
import { MandatoryFieldsEventUtil } from '../Utilities/MandatoryFieldsEventUtil';
import { CommonActions } from '../Utilities/CommonActions';
//import { MandatoryFieldUtil } from '../Utilities/MandatoryFieldUtil';
import { TestConfig } from '../Utilities/Test.Config';
import { JsonUtil } from '../Utilities/JsonUtil';
import { Scheduling } from '../pages/Scheduling';
import { Accounting } from '../pages/Accounting';
import { WareHouse } from '../pages/WareHouse';
const config = new TestConfig();

test('authenticate', async ({ page }) => {

    test.setTimeout(1800000);

    const login = new Login(page);
    const homePage = new HomePage(page);
    const customer = new Customer(page);
    const event = new Event(page);
    const home = new Home(page);
    const kitchen = new KitchenService(page)
    const estimate = new Estimate(page);
    const billworksheet = new BillWorksheet(page);
    const changeRequests = new ChangeRequests(page);
    const services = new Services(page);
    const commonActions = new CommonActions(page);
    const mandatoryfieldseventutil = new MandatoryFieldsEventUtil(page);
    const approval = new Approvals(page);
    const accounting = new Accounting(page);
    const wareHouse = new WareHouse(page);
    const scheduling = new Scheduling(page)
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



    //await homePage.clickHome();


    /*
    
        await homePage.navigateToModule("Sales New");
    
    
        console.log("Sales New navigation complete");
    
    
        await commonActions.closeCommonPopup();
        await customer.Menu1();
    
    
        //---------------------------------------------------event creation --------------------------------------
    
    
    
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
    
        //await CommonActions.closeCommonPopup();
    
        // await test.step("EventFilter", async () => {
        //  await event.EventFilter();
    
        // console.log("Event dashBoard is displayed");
    
        // });
    
        //Menu Service
        
        await test.step("MEnu", async () => {
            await services.openMenuService();
    
    
            await services.searchandAdd();
    
            await services.filterICon();
            console.log("filter working");
            await services.goButton();
    
            await services.itemSelectBox();
    
            await services.processServiceRows();
            await services.saveBtn();
            console.log("save working");
            await services.closeBtn();
            await services.processFinalizeWorkflow();
            await services.serviceCloseBtn();
            await services.menuServiceStatus();
        });
        await services.AllServiceStatuses();
        await services.openAlcService();
    
        await services.AlcServiceStatus();
    
        await services.EquipService();
    
    
    
        await services.openSchService();
        await services.Schedulingsave();
    
    
        await estimate.EstimateService();
        await estimate.handleEstimateScreen();
    
    
        await changeRequests.MenuChangeRequest();
        await changeRequests.MChangeRequest();
        //await page.pause();
        await changeRequests.addEditItems();
    
    
    
    
    */
    /*
        await test.step("BillService", async () => {
    
            await billworksheet.openbillService();
            await billworksheet.BillProcess();
            //const estimateTotal = await estimate.TotalEstimate();
    
            //await billworksheet.BillValue(estimateTotal);
    
    
        });
    */

    /*
        await test.step("KitchenService", async () => {
    
            await home.navigateToKitchen();
    
    
            await commonActions.closeUnacknowledgedpopup();
    
            console.log("its kitchen screen")
    
    
        });
        */
    /*
        await test.step("kitchenfilter", async () => {
    
            await kitchen.Filter();
    
            await commonActions.childwindow1();
    
            console.log("its kitchen screen Filter is working");
    
            await commonActions.closeUnacknowledgedpopup();
    
    
            await kitchen.kitchenservice();
    
            // await page.pause();
        });
    */

    await test.step("SchedulingService", async () => {

        await home.navigateToScheduling();
        await commonActions.closeUnacknowledgedpopup();
   
        //await kitchen.Filter();
       // await commonActions.closeUnacknowledgedpopup();
        await scheduling.SchedulingAck();
             await home.navigateToScheduling();
        await commonActions.closeUnacknowledgedpopup();
       
    });

   
    await test.step("WarehouseService", async () => {
   
   
           await home.navigateToWarehouse();
           await commonActions.closeUnacknowledgedpopup();
        //    await kitchen.Filter();
         
        //   await commonActions.closeUnacknowledgedpopup();
   
           await wareHouse.Warehouse_Alc();
            await home.navigateToWarehouse();
           await commonActions.closeUnacknowledgedpopup();
         //  await page.pause();
       });
   
 
       
          await test.step("AccountingService", async () => {
      
      
              await home.navigateToAccounting();
              await commonActions.closeUnacknowledgedpopup();
            //  await kitchen.Filter();
               
            //    await commonActions.closeUnacknowledgedpopup();
               
              await accounting.AccountingVendorBills();
           
              await homePage.clickHome();
              await homePage.navigateToModule("Sales New");
      
              await accounting.AccountingService();
              await accounting.openbillService();
              await accounting.BillProcess();
              await home.SalesNewToAccounting();
               await accounting.AccountingAccept();
               await home.navigateToAccounting();
              await commonActions.closeUnacknowledgedpopup();
      
      
          });
     
  
  
      


});