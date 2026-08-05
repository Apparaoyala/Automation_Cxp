import { Page, Locator } from '@playwright/test';
import { Services } from './Services';

export class Estimate {


    private readonly page: Page;
     private readonly EstimateHeader:Locator;
    private readonly EstimateIcon: Locator;
   private readonly serviceHeaders:Locator;
   private readonly saveBtn:Locator;

 constructor(page: Page) {

        this.page = page;
        

this.EstimateHeader= this.page.locator('.header-fs', {
        hasText: 'Estimates'     
    });

    this.EstimateIcon = page.locator('span').filter({ hasText: 'Create Event' }).first();
this.saveBtn=page.getByRole('button', { name: ' Save ' }).first()

this.serviceHeaders= page.locator(
  "//div[contains(@class,'header-fs') and contains(text(),'-')]"
);

 }

 async EstimateService() {

     
const estimateCard = this.page.locator('.card').filter({
    has: this.page.getByText('Estimates')
});

const estimateIcon = estimateCard
    .locator('.service-request .icon-circle')
    .first();

await estimateIcon.click();


}
async EstimateValues() {
    const sections = this.page.locator(
  "span.calendar-data"
);

const count = await sections.count();

console.log("Total Sections:", count);


for(let i = 0; i < 8; i++){

    const sectionName =
      await sections.nth(i).textContent();

    console.log(
      `Opening: ${sectionName}`
    );

    await sections.nth(i).click();

    await this.page.waitForTimeout(1000);


const suggestedPrice =
await this.page.locator(
    "//label[contains(text(),'Suggested Price')]/following::input[1]"
).first().inputValue();

console.log(
    "Suggested Price:",
    suggestedPrice
);


const value =
suggestedPrice.trim() === ""
? "100"
: suggestedPrice;




await this.page.locator(
    "//label[contains(text(),'Subtotal')]/following::input[1]"
).first().fill(value);

await this.page.locator('button').filter({
    hasText: 'Save'
}).first().click();


}
}


    

   

}


