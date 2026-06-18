import { Page, Locator } from '@playwright/test';

export class MandatoryFieldUtil {

    private readonly page: Page;


    
    

    constructor(page: Page) {

        this.page = page;

      
    }
       async getMandatoryFieldCount() {

    const mandatoryLabels = this.page.locator(
        "//label[.//span[contains(@class,'text-danger')]]"
    );

    const count = await mandatoryLabels.count();

    console.log("Mandatory Count :", count);

    for(let i = 0; i < count; i++) {

        const field = mandatoryLabels.nth(i);

        const fieldName =
            await field.textContent();

        console.log(`Field ${i + 1}: ${fieldName}`);

        const row = field.locator(
    'xpath=parent::div/parent::div'
    );

        console.log("Row Found");


        const controlContainer = row.locator(
    "div.col-md-8"
);

const html = await field.evaluate(
    el => el.parentElement?.outerHTML
);

console.log(html);
    }
}
       

       async identifyControlType(control: Locator): Promise<string> {

    if(await control.locator('p-multiselect').count() > 0) {
        return 'MULTISELECT';
    }

    if(await control.locator('p-dropdown').count() > 0) {
        return 'DROPDOWN';
    }

    if(await control.locator('input[type="checkbox"]').count() > 0) {
        return 'CHECKBOX';
    }

    if(await control.locator('input').count() > 0) {
        return 'TEXTBOX';
    }

    return 'UNKNOWN';
}

    }

   
