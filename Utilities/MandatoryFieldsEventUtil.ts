import { Page, Locator } from '@playwright/test';


export class MandatoryFieldsEventUtil {

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

       console.log("******** MandatoryFieldsEventUtil Loaded ********");
    }
      
      async getMandatoryFieldCount( excelData: Map<string, any>) {

    const mandatoryLabels = this.page.locator(
        "//label[.//span[contains(@class,'text-danger')]]"
    );

    const count = await mandatoryLabels.count();

    console.log("Mandatory Count :", count);
    //
    console.log("\n========== MANDATORY FIELDS ==========");

const mandatoryFieldNames: string[] = [];

for (let i = 0; i < count; i++) {

    const label = mandatoryLabels.nth(i);
    console.log("1");
console.log(
    "Label HTML:",
    await label.evaluate(el => el.outerHTML)
);
    const fieldName =
        (await label.textContent())
            ?.replace("*", "")
            .trim() || "";

    mandatoryFieldNames.push(fieldName);
}

mandatoryFieldNames.forEach((field, index) => {
    console.log(`${index + 1}. ${field}`);
});

console.log("\nTotal Mandatory Fields :", mandatoryFieldNames.length);
console.log("======================================\n");

//

    for (let i = 0; i < count; i++) {

        const label = mandatoryLabels.nth(i);
        console.log("2");
        console.log(
    "Label HTML:",
    await label.evaluate(el => el.outerHTML)
);
const fieldName =
    (await label.textContent())?.replace("*", "").trim();

if (!fieldName) {
    continue;
}
// Find control
const value = excelData.get(fieldName);


//30--06-2026

     /*

        // Get nearest row
        const row = label.locator(
            //"xpath=ancestor::div[contains(@class,'row')][1]"
             "xpath=ancestor-or-self::div[contains(@class,'row')][1]"
        );

// Find control container
        const controlContainer = row.locator(
            "xpath=.//div[contains(@class,'col-md-8') or contains(@class,'col-lg-8')]"
        );
*/


/*
const controlContainer = label.locator(
    "xpath=parent::div/following-sibling::div[1]"
);
*/
const controlContainer =
    await this.findControlContainer(label);
//




        // Detect control type
        const controlType =
            await this.identifyControlType(controlContainer);

//103 to107 is newly added for debug
// if (count === 1) {
//     console.log("Control HTML:");
//     console.log(await controlContainer.first().evaluate(el => el.outerHTML));
// }






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
console.log(
    "Field:",
    fieldName,
    "Control Type:",
    controlType
);
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

   
    
}
    }
}
       
private async findControlContainer(label: Locator): Promise<Locator> {

    const fieldName = await label.textContent();

    console.log("Searching control for :", fieldName);

    const parentDivContainer = label.locator(
        "xpath=parent::div/following-sibling::div[1]"
    );

    console.log(
        "Parent HTML:",
        await parentDivContainer.evaluate(el => el.outerHTML)
    );

    if (await parentDivContainer.count() > 0) {
        return parentDivContainer;
    }

    const siblingContainer = label.locator(
        "xpath=following-sibling::div[1]"
    );

    console.log(
        "Sibling HTML:",
        await siblingContainer.evaluate(el => el.outerHTML)
    );

    return siblingContainer;
}
       
async identifyControlType(control: Locator): Promise<string> {

    console.log("================================");
    console.log("Inside identifyControlType");

    console.log("Outer HTML:");
    console.log(await control.evaluate(el => el.outerHTML));

    console.log("Input Count:",
        await control.locator("input").count());

    console.log("Dropdown Count:",
        await control.locator("p-dropdown").count());

    console.log("Checkbox Count:",
        await control.locator('input[type="checkbox"]').count());

    console.log("Textarea Count:",
        await control.locator("textarea").count());

    if (await control.locator("p-dropdown").count() > 0) {
        return "DROPDOWN";
    }

    if (await control.locator('input[type="checkbox"]').count() > 0) {
        return "CHECKBOX";
    }

    if (await control.locator("input:not([readonly]), textarea").count() > 0) {
        return "TEXTBOX";
    }

    return "UNKNOWN";
}/*
async handleTextbox(controlContainer: Locator, value: string) {

    const textbox = controlContainer.locator('input');

    await textbox.fill(value);

}*/

async handleTextbox(controlContainer: Locator, value: string) {

    //console.log("Entering value:", value);

    const textbox = controlContainer.locator(
        'input:not([readonly]), textarea'
    );

    await textbox.fill(value);

    //console.log("Value entered:", value);
}

async handleDropdown(controlContainer: Locator) {
    console.log("==============================");
console.log("Dropdown HTML:");
console.log(await controlContainer.evaluate(el => el.outerHTML));

    const dropdown = controlContainer.locator("p-dropdown");

    await dropdown.click();
await this.page.waitForTimeout(2000);

console.log(
    "Options Count:",
    await this.page.locator("li.p-dropdown-item").count()
);
    const options = this.page.locator("li.p-dropdown-item");

    const count = await options.count();

    if (count < 2) {
        throw new Error("Dropdown has less than 2 options.");
    }

    await options.nth(1).click();   // Index 1 = second option

    console.log("Selected second dropdown option");
}

    }

   
