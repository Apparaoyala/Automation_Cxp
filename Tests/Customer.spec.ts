import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginHelper } from '../pages/LoginHelper';
import { TestConfig } from '../Utilities/Test.Config';
import { expect } from '@playwright/test';
import { CommonActions } from '../Utilities/CommonActions';
import { JsonUtil } from '../Utilities/JsonUtil';
import { Approvals } from '../pages/Approval';
import { ChangeRequests } from '../pages/ChangeRequests';
import { Home } from '../pages/Home';
import { FrameManager } from '../Utilities/FrameManager';
import { MandatoryFieldsEventUtil } from '../Utilities/MandatoryFieldsEventUtil';
import { MandatoryFieldsContactUtil } from '../Utilities/MandatoryFieldsContactUtil';
import { MandatoryFieldUtil } from '../Utilities/MandatoryFieldUtil';
import { Customer } from '../pages/Customer';

import { Login } from '../pages/Login';
import { Contact } from '../pages/Contact';
const customers = JsonUtil.readJson(
  './Utilities/TestData/Customer.json'
);
const contacts = JsonUtil.readJson(
  './Utilities/TestData/Contact.json'
);
if (
  customers.length !== contacts.length
) {
  throw new Error(
    "Customer, Contact and Event record count mismatch"
  );
}
for (let i = 1; i < customers.length; i++) {

  const customerData = customers[i];
  const contactData = contacts[i];
  test(`Customer ${i + 1}`,
    async ({ page }) => {

      test.setTimeout(1800000);
      const config = new TestConfig();
      console.log("APP_URL =", process.env.APP_URL);
      console.log("CONFIG_URL =", config.appUrl);

      let eventNumber: string;
      const homePage = new HomePage(page);

  


      const login = new Login(page);
      const contact = new Contact(page);
      const customer = new Customer(page);

      const loginelper = new LoginHelper();


      const mandatoryfieldseventutil = new MandatoryFieldsEventUtil(page);
      const mandatoryfieldutil = new MandatoryFieldUtil(page);
      const mandatoryFieldsContactUtil = new MandatoryFieldsContactUtil(page);
      const commonActions = new CommonActions(page);
      const home = new Home(page);
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
                await commonActions.closeCommonPopup();

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


            
          });
        }