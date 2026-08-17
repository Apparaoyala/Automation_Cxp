test('test', async ({ page }) => {
  await page.goto('https://testapps.aquilasoftware.com/CaterXpert.action');
  await page.locator('#CatererId').fill('behindthescenestest');
  await page.locator('#UserName').click();
  await page.locator('#UserName').fill('superadmin');
  await page.locator('#UserName').press('Tab');
  await page.locator('#Password').fill('Test2025#');
  await page.locator('#Password').press('Enter');
  await page.goto('https://testapps.aquilasoftware.com/CaterXpert2026_0802/homepage/appAuthenticate.action');
  await page.locator('frame[name="header"]').contentFrame().getByRole('link', { name: 'Home', exact: true }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.locator('frame[name="right"]').contentFrame().getByRole('link', { name: 'Kitchen' }).click();
  const page2 = await page2Promise;
  await page2.locator('frame[name="right"]').contentFrame().getByRole('button', { name: 'Close' }).click();
  const page5Promise = page.waitForEvent('popup');
  await page.locator('frame[name="header"]').contentFrame().getByRole('link', { name: 'Filter' }).click();
  const page5 = await page5Promise;
  await page3.locator('#cisnumber').click();
  await page3.locator('#cisnumber').fill('3333');
  await page3.locator('#cisnumber').press('Enter');
  await page5.locator('frame[name="right"]').contentFrame().getByRole('button', { name: 'Close' }).click();
 
  const page7Promise = page.waitForEvent('popup');
  await page.locator('#prepItems').contentFrame().getByRole('button', { name: 'Close' }).click();
  const page7 = await page7Promise;
  await page7.locator('frame[name="right"]').contentFrame().getByRole('button', { name: 'Close' }).click();
  await page.locator('frame[name="right"]').contentFrame().getByRole('link', { name: '/1' }).click();
  const page9Promise = page.waitForEvent('popup');
  await page.locator('frame[name="view"]').contentFrame().getByRole('button', { name: 'Close' }).click();
  const page9 = await page9Promise;
  await page9.locator('frame[name="right"]').contentFrame().getByRole('button', { name: 'Close' }).click();
  await page.locator('frame[name="right"]').contentFrame().getByRole('link', { name: 'Accpt' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('frame[name="right"]').contentFrame().getByRole('button', { name: 'Bill' }).click();
  await page.goto('https://testapps.aquilasoftware.com/CaterXpert2026_0802/sales/billMenu.action?eventId=3333');
  const page11Promise = page.waitForEvent('popup');
  
  const page11 = await page11Promise;
  await page11.locator('frame[name="right"]').contentFrame().getByRole('button', { name: 'Close' }).click();
});



 await rightFrame().contentFrame().getByRole('link', { name: 'Sent' }).click();
  await page.locator('frame[name="right"]').contentFrame().getByRole('button', { name: 'Accept' }).click();
  await page.locator('frame[name="header"]').contentFrame().getByRole('link', { name: 'Quantify All  |' }).click();
  await page.locator('frame[name="header"]').contentFrame().getByRole('link', { name: 'Gather All  |' }).click();
  await page.locator('#prepItems').contentFrame().getByRole('button', { name: 'Save' }).click();
await page.locator('frame[name="right"]').contentFrame().getByRole('button', { name: 'Close' }).click();
  await page.locator('frame[name="right"]').contentFrame().getByRole('link', { name: 'Accpt' }).click();
   page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
         await frameManager.rightFrame().contentFrame().getByRole('link', { name: 'Sent' }).click();
  });
    await page.locator('frame[name="right"]').contentFrame().getByRole('button', { name: 'Bill' }).click();

