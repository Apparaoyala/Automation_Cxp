import { Page, Locator } from '@playwright/test';

import { Estimate } from './Estimate';

export class BillWorksheet {


    private readonly page: Page;
     private readonly billHeader: Locator;
    private readonly GenarateBill:Locator;

      constructor(page: Page) {

        this.page = page;

this.billHeader= this.page.locator('.header-fs', {
        hasText: 'Billing'
    });

    this.GenarateBill=page.getByRole('button',{ name: 'Generate Bill' })

      }

async openbillService() {

    const headerText = await this.billHeader.textContent();

    console.log(headerText);

   const BillCard = this.page.locator('.card').filter({
    has: this.page.getByText('Billing  -')
});
const serviceIcon =
BillCard.locator('.service-request .icon-circle').first();
console.log(await BillCard.locator('.icon-circle').count());
// Step 3: If Bill is New
    if (headerText?.includes('New')) {

        console.log("Bill is New");
       await serviceIcon.click();
    }
    // Step 4: If Bill is Prog
    else if (headerText?.includes('Prog')) {

        console.log("Bill is In Progress");
         await serviceIcon.click();
    
    }
    // Step 5: If Bill is None
    else {

        console.log("Bill Service Not Available");

    }


}
async BillProcess() {

     await this.GenarateBill.click();



}
async BillValue(estimateTotal: string) {

    const grandTotal = await this.page
        .locator("//label[contains(text(),'Grand Total')]/following::input[1]")
        .inputValue();

    const estimateValue = parseFloat(
        estimateTotal.replace(/,/g, "")
    );

    const billValue = parseFloat(
        grandTotal.replace(/,/g, "")
    );

    if (estimateValue === billValue) {

        console.log(
            `✅ PASS - Estimate (${estimateValue}) == Bill (${billValue})`
        );

    } else {

        console.log(
            `❌ FAIL - Estimate (${estimateValue}) != Bill (${billValue})`
        );

    }
}
    }