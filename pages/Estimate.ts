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



console.log(
  "Opening:",
  sectionName
);

console.log(
  "Value:",
  value
);
await this.page.locator(
    "//label[contains(text(),'Subtotal')]/following::input[1]"
).first().fill(value);

await this.page.locator('button').filter({
    hasText: 'Save'
}).first().click();
console.log(
  "Saved:",
  sectionName
);

}


}


    

   async TotalEstimate() {

    await this.page.locator(
  "//button[contains(.,'Total Estimate')]"
).first().click();


const dropdowns = this.page.locator(".p-dropdown");

const count1 = await dropdowns.count();

console.log("Dropdown Count:", count1);

for(let i = 1; i < count1; i += 4){

    console.log(`Selecting dropdown ${i}`);

    await dropdowns.nth(i).click();

    const options = this.page.locator(
      "li[role='option']"
    );

    const optionCount = await options.count();

   if(optionCount > 0){

    await options.first().click();

    console.log(
      `Selected value for dropdown ${i}`
    );
}
}


await this.page.locator('button').filter({
    hasText: 'Save'
}).first().click();


await this.page.locator('button').filter({
    hasText: 'Close'
}).first().click();

    
   }

}


