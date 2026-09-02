
import {test, expect} from "@playwright/test";
 
test("Login Application", async ({ page }) => {
   await page.goto("https://testapps.aquilasoftware.com/CaterXpert.action");
  await page.locator("input#CatererId").fill("Ridgewellstest");
  await page.locator('#UserName').fill("Superadmin");
  await page.locator('[type="password"]').fill("Test2025#");
  //await page.pause();
  await page.locator('[value="Go"]').click();
  /*await page
            .frameLocator('[name="header"]')
            .locator("img[title='Home']").click();*/
  //await page.getByText("Save", { exact: true }).click();
  await page.pause();
  await page.frameLocator('[name="right"]')
            .getByRole('button', { name: 'Save', exact:true})
            .click();
 
  await page.frameLocator('[name="right"]')
            .getByRole('link', { name: 'Sales', exact:true})
            .click();
 
  await page.frameLocator('[name="header"]')
            .getByRole('link',{name: 'Customer Search', exact:true})
            .click();
  //await page.pause();
 
  // await page.frameLocator('[name="header"]')
  //           .getByRole('link', {name:'Sales', exact:true})
  //           .click();
 
  const newCust = page.frameLocator('[name="header"]')
            .getByRole('link', {name:'New Customer', exact:true});
 
  await expect(newCust).toBeVisible();
  await expect(newCust).toBeEnabled();
  await newCust.click();
 //await page.pause();
  /*const custTypeLabel = page.getByText('Customer Types ', {exact:true});
  await expect(custTypeLabel).toBeVisible();
  await custTypeLabel.selectOption({index:2});*/
 
  /*const viewFrame = page.frameLocator('[name="view"]');
  await expect(viewFrame.getByLabel('Customer Types ')).toBeVisible();
  await expect(viewFrame.locator('.mandatoryField').first()).toBeVisible();
  await viewFrame.locator('#typeId').selectOption({ index: 2 });*/
//Navigating to "View" Frame
  const viewFrame = page.frameLocator('[name="view"]');
 
await expect(
  viewFrame.locator('label').filter({ hasText: 'Customer Types' }))
  .toBeVisible();
 
await expect(
  viewFrame.locator('.mandatoryField').first())
  .toBeVisible();
 
await viewFrame
  .locator('#typeId')
  .selectOption({ index: 2 });
//Customer Name
await expect(viewFrame.locator('label').filter({hasText: 'Customer Name'}))
.toBeVisible();
await viewFrame.locator('#customerName')
.fill('Michael');
//First Name
await expect(viewFrame.locator('label').filter({hasText: 'First Name'}))
.toBeVisible();
await viewFrame.locator('#firstname')
.fill('Scott');
//Proposal Name
await expect(viewFrame.locator('label').filter({hasText: 'Proposal Name '}))
.toBeVisible();
await viewFrame.locator('#proposalname')
.fill('Jessica');
 
//Radio Button
await expect(viewFrame.locator('label').filter({hasText: 'VHM'}))
.toBeVisible();
await viewFrame.locator ('#ahmyes')
.check();
//Alias Name
await expect(viewFrame.locator('label').filter({hasText: 'Alias Name '}))
.toBeVisible();
await viewFrame.locator('#aliasname')
.fill('Smith');
//Address
await expect(viewFrame.locator('label ').filter({hasText: 'Building '}).first())
.toBeVisible();
await viewFrame.locator('#addbuilding')
.fill('Nayagara');
//Street
await expect(viewFrame.locator('#streetLabel').filter({hasText: 'Street'}).first())
.toBeVisible();
await viewFrame.locator('#addstreet').fill('Old Street');
//Suite
await expect(viewFrame.locator('#suiteLabel').filter(({hasText: 'Suite'})).first())
.toBeVisible();
await viewFrame.locator('#addsuite').fill('Suite@123');
//City
await expect(viewFrame.locator('#cityLabel').filter({hasText: 'City'}).first())
.toBeVisible();
await viewFrame.locator('#addcity').fill('New City');
await page.pause();
//State Dropdown
await expect(viewFrame.locator('#stateLabel').first())
.toBeVisible();
//----
await viewFrame.locator('#addstate').first().click(); 
 await expect(viewFrame.locator('#addstate_popup')).toBeVisible(); 
  console.log(await viewFrame.locator('#addstate_popup').innerText() );  

await viewFrame.locator('#addstate_popup').getByText('VA', { exact: true }).click();  
//----------
//Zip
await expect(viewFrame.locator('#zipLabel').first())
.toBeVisible();
await viewFrame.locator('#addzip')
.fill('12121');
//Phone
await expect(viewFrame.locator('label').filter({hasText:'Phone'}).first())
.toBeVisible();
await viewFrame.locator('#addphone').fill('7894560123');
await page.pause();
//CheckBox
await expect(viewFrame.locator('label').filter({hasText:'Billing Address '}))
.toBeVisible();
await expect(viewFrame.locator('label').filter({hasText:'Same as Address '}))
.toBeVisible();
await viewFrame.locator('#chkBillingAddress')
.check();
 
 
 
console.log("Hello Kranthi Arumulla");
 
 
 
 
 
 
         
  await page.pause();
  //console.log(await page.title());
});
 
 
 