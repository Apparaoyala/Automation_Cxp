import { Page, Locator } from '@playwright/test';
export class Contact{

 private readonly page: Page;


constructor(page: Page) {
     this.page = page;
}
}