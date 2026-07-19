import { Login } from '../pages/Login';
import { Page, Locator } from '@playwright/test';
import { TestConfig } from '../Utilities/Test.Config';


export class LoginHelper {

static async login(page:Page){

const login = new Login(page);
const config = new TestConfig();

await page.goto(config.appUrl);

await login.login(
config.Caterid,
config.UserId,
config.password
);

}

}