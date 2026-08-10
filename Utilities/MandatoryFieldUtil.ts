import { Page, Locator } from '@playwright/test';
import { Customer } from '../pages/Customer';


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
      
    async getMandatoryFieldCount(jsonData: Record<string, any>) {

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

const value = jsonData[fieldName];


//30--06-2026

    
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
// if (controlType === "CHECKBOX" && value !== undefined) {

//     await this.handleCheckbox(
//         controlContainer,
//         String(value)
//     );

// }
if (value === undefined) {
    continue;
}
// console.log(
//     "Field:",
//     fieldName,
//     "Control Type:",
//     controlType
// );
switch (controlType) {

    case "TEXTBOX":
        await this.handleTextbox(
            controlContainer,
            String(value)
        );
        break;

    case "CHECKBOX":
        await this.handleCheckbox(
            controlContainer,
            String(value)
        );
        break;

       case "DROPDOWN":
    await this.handleDropdown(controlContainer);
    break;

   case "MULTISELECT":
    await this.handleMultiSelect(
        controlContainer,
        value
    );
    break;
}
    }
}
       

       
async identifyControlType(control: Locator): Promise<string> {

    if (
        await control.locator("p-multiselect").count() > 0
    ) {
        return "MULTISELECT";
    }

    if (
        await control.locator("p-dropdown").count() > 0 ||
        await control.locator("input.p-dropdown-label").count() > 0
    ) {
        return "DROPDOWN";
    }

    if (
        await control.locator('input[type="checkbox"]').count() > 0
    ) {
        return "CHECKBOX";
    }

    if (
        await control.locator("input[bsdatepicker]").count() > 0
    ) {
        return "DATETIME";
    }

    if (
        await control.locator("input:not([readonly]), textarea").count() > 0
    ) {
        return "TEXTBOX";
    }

    return "UNKNOWN";
}

async handleTextbox(controlContainer: Locator, value: string) {

    //console.log("Entering value:", value);

    const textbox = controlContainer.locator(
        'input:not([readonly]), textarea'
    );

    await textbox.fill(value);

    //console.log("Value entered:", value);
}

async handleDropdown(controlContainer: Locator) {

    const dropdown = controlContainer.locator("p-dropdown");

    await dropdown.click();

    const options = this.page.locator("li.p-dropdown-item");

    const count = await options.count();

    if (count < 2) {
        throw new Error("Dropdown has less than 2 options.");
    }

    await options.nth(1).click();   // Index 1 = second option

    console.log("Selected second dropdown option");
}
async handleMultiSelect(controlContainer: Locator,value: any){

    const values: string[] = Array.isArray(value)
        ? value.map(String)
        : [String(value)];

    const multiSelect = controlContainer.locator("p-multiselect");

    await multiSelect
        .locator(".p-multiselect-trigger")
        .click();

    const options = this.page.locator(
        "li.p-multiselect-item"
    );

    const optionCount = await options.count();

    for (const expectedValue of values) {

        let found = false;

        for (let i = 0; i < optionCount; i++) {

            const option = options.nth(i);

            const text = (
                await option.innerText()
            ).trim();

            if (
                text.toLowerCase() ===
                expectedValue.trim().toLowerCase()
            ) {

                console.log(
                    `Selecting MultiSelect: ${text}`
                );

                await option.click();

                found = true;
                break;
            }
        }

        if (!found) {
            console.log(
                `MultiSelect option "${expectedValue}" not found`
            );
        }
    }

    // Close popup
    await multiSelect
        .locator(".p-multiselect-trigger")
        .click();
}
    }

   