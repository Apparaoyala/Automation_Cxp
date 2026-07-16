import { test, expect, Page } from '@playwright/test';
import { Login } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import { Customer } from '../pages/Customer';
import { Event } from '../pages/Event';
import { commonActions } from '../Utilities/CommonActions';
import { TestConfig } from '../Utilities/Test.Config';


const config = new TestConfig();

test('Menu Service Screen', async ({ page }) => {



test.setTimeout(180000);

    const login = new Login(page);
    const homePage = new HomePage(page);
    const customer = new Customer(page);
    const event = new Event(page);
    const CommonActions = new commonActions(page);

console.log("Menu service success");
 await page.pause();
 await event.openEventDashboard();


});