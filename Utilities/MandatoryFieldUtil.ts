import { Page, Locator } from '@playwright/test';


export class MandatoryFieldUtil {

    private readonly page: Page;


    
    
async handleCheckbox(controlContainer: Locator, value: string) {
    const checkbox =
    controlContainer.locator('input[type="checkbox"]');
    const checked =
    await checkbox.isChecked();

console.log("Already Checked :", checked);
if (
    value.toUpperCase() === "YES" ||
    value.toUpperCase() === "TRUE"
) {

    if (!checked) {

        await checkbox.check();

        console.log("Checkbox Checked");

    }

}
else {

    if (checked) {

        await checkbox.uncheck();

        console.log("Checkbox Unchecked");

    }

}
}
    constructor(page: Page) {

        this.page = page;

      
    }
      // async getMandatoryFieldCount() {}
      async getMandatoryFieldCount( excelData: Map<string, any>) {

    const mandatoryLabels = this.page.locator(
        "//label[.//span[contains(@class,'text-danger')]]"
    );

    const count = await mandatoryLabels.count();

    console.log("Mandatory Count :", count);

    for (let i = 0; i < count; i++) {

        const label = mandatoryLabels.nth(i);
const fieldName =
    (await label.textContent())?.replace("*", "").trim();

if (!fieldName) {
    continue;
}
// Find control
const value = excelData.get(fieldName);

console.log(fieldName);
console.log(value);
//30--06-2026

      //  console.log("--------------------------------");

       // console.log("Field :", fieldName);

        // Get nearest row
        const row = label.locator(
            //"xpath=ancestor::div[contains(@class,'row')][1]"
             "xpath=ancestor-or-self::div[contains(@class,'row')][1]"
        );

// Find control container
        const controlContainer = row.locator(
            "xpath=.//div[contains(@class,'col-md-8') or contains(@class,'col-lg-8')]"
        );

        // Detect control type
        const controlType =
            await this.identifyControlType(controlContainer);

        //console.log("Control Type :", controlType);
if (controlType === "CHECKBOX" && value !== undefined) {

    await this.handleCheckbox(
        controlContainer,
        String(value)
    );

}
    }
}
       

       
async identifyControlType(control: Locator): Promise<string> {

    if (await control.locator('p-multiselect').count() > 0) {
        return 'MULTISELECT';
    }

    if (await control.locator('p-dropdown').count() > 0) {
        return 'DROPDOWN';
    }

    if (await control.locator('input[type="checkbox"]').count() > 0) {
        return 'CHECKBOX';
    }

    if (await control.locator('input:not([readonly]), textarea').count() > 0) {
        return 'TEXTBOX';
    }

    return 'UNKNOWN';
}



    }

   
