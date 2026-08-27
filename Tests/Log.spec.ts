
import {test, expect} from "@playwright/test";
 
test.skip("Login Application", async ({ page }) => {
  await page.goto("https://testapps.aquilasoftware.com/CaterXpert.action");
  await page.locator("input#CatererId").fill("Ridgewellstest");
  await page.locator('#UserName').fill("Superadmin");
  await page.locator('[type="password"]').fill("Test2025#");

  await page.locator('[value="Go"]').click();
 

  await page
        .frameLocator('[name="header"]')
        .getByText('Superadmin Login', { exact: true });

  await page
            .frameLocator('[name="header"]')
            .locator("img[title='Home']").click();
 await page.pause();
});