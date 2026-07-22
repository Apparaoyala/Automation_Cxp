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
      
      async getMandatoryFieldCount(  jsonData: Record<string, any>) {
        

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


//

    for (let i = 0; i < count; i++) {

        const label = mandatoryLabels.nth(i);
 
const fieldName =
    (await label.textContent())?.replace("*", "").trim();

if (!fieldName) {
    continue;
}
// Find control
const value = jsonData[fieldName];

// console.log(
//     `Field = ${fieldName}, Excel Value = ${value}`
// );

const controlContainer =
    await this.findControlContainer(label);
//




        // Detect control type
        const controlType =
            await this.identifyControlType(controlContainer);


if (value === undefined) {
    continue;
}


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
    await this.handleDropdown(
        controlContainer,
        String(value)
    );
    break;

   case "DATETIME":

    await this.handleDateTime(
        controlContainer,
        String(value)
    );

    break;
    
}
    }
}
       
private async findControlContainer(label: Locator): Promise<Locator> {

    const fieldName = await label.textContent();

    //console.log("Searching control for :", fieldName);

    const parentDivContainer = label.locator(
        "xpath=parent::div/following-sibling::div[1]"
    );

  

    if (await parentDivContainer.count() > 0) {
        return parentDivContainer;
    }

    const siblingContainer = label.locator(
        "xpath=following-sibling::div[1]"
    );


    return siblingContainer;
}
       
async identifyControlType(control: Locator): Promise<string> {

   

    if (
    await control.locator("p-dropdown").count() > 0 ||
    await control.locator("input.p-dropdown-label").count() > 0
) {
    return "DROPDOWN";
}

    if (await control.locator('input[type="checkbox"]').count() > 0) {
        return "CHECKBOX";
    }
    if (await control.locator("input[bsdatepicker]").count() > 0) {
    return "DATETIME";
    }
    if (await control.locator("input:not([readonly]), textarea").count() > 0) {
        return "TEXTBOX";
    }

    return "UNKNOWN";
}

async handleTextbox(controlContainer: Locator, value: string) {

    //console.log("Entering value:", value);

    const textbox = controlContainer.locator(
        'input:not([readonly]), textarea'
    );
//already data fill to the field 
 const currentValue = (await textbox.inputValue()).trim();

    if (currentValue !== "") {

        console.log("Textbox already has value:", currentValue);

        return;
    }
   //already data fill to the field just skip the field
    await textbox.fill(value);


    
}
async handleDateTime(controlContainer: Locator, value: string) {

    const parts = value.trim().split(/\s+/);

    const date = parts[0];

    const time = parts.slice(1).join(" ");

    // Open calendar
    await controlContainer
        .locator("input[bsdatepicker]")
        .click();

    // Pick date
    await this.selectDate(date);

    // Open time picker
    await controlContainer
        .locator("span.schedule-icon")
        .click();

    // Pick time
    await this.selectTime(time);
}
async selectDate(date: string) {

    const [, day] = date.split("/");

    await this.page
        .locator("bs-datepicker-container td span", {
            hasText: String(Number(day))
        })
        .first()
        .click();

}
async selectTime(time: string) {

   time = time.trim();

// remove extra colon before AM/PM if present
time = time.replace(":", ":",); // (we'll normalize below)

// Convert "10:15: PM" -> "10:15 PM"
time = time.replace(/:(\s*AM|\s*PM)$/i, " $1");

const match = time.match(/(\d{1,2}:\d{2})\s*(AM|PM)/i);

if (!match) {
    throw new Error(`Invalid time format: ${time}`);
}

const clockTime = match[1];
const period = match[2].toUpperCase();



    //console.log("Selecting:", clockTime, period);

    // Wait for popup
    await this.page.locator(".p-overlaypanel-content")
        .waitFor({ state: "visible" });

    // Select AM / PM
   await this.page
    .locator(".p-overlaypanel-content label")
    .getByText(period, { exact: true })
    .click();

    // Debug
    const count = await this.page.locator("span.time-hover").count();
    //console.log("Time Count:", count);

    for (let i = 0; i < count; i++) {

        const option = this.page.locator("span.time-hover").nth(i);
        const text = (await option.innerText()).trim();

       // console.log(text);

        if (text === clockTime) {

            await option.scrollIntoViewIfNeeded();

            await option.click({ force: true });

            console.log("Time Selected:", text);

            break;
        }
    }
}

async handleDropdown(controlContainer: Locator, value: string) {

   // console.log("Expected Excel Value:", value);

    const dropdown = controlContainer.locator("p-dropdown");

    await controlContainer
    .locator(".p-dropdown-trigger")
    .click();

    await this.page
    .locator("li.p-dropdown-item")
    .first()
    .waitFor({
        state: "visible",
        timeout: 15000
    });

   // const options = this.page.locator("div.p-dropdown-panel:visible li.p-dropdown-item");
   const options = this.page.locator("li.p-dropdown-item");

// await options
//     .filter({ hasText: value })
//     .first()
//     .click();

    const count = await options.count();

   // console.log("Option Count:", count);

    let optionFound = false;

    for (let i = 0; i < count; i++) {

        const text = (await options.nth(i).innerText()).trim();

       // console.log("Option:", text);

        if (
    text.trim().toLowerCase() ===
    value.trim().toLowerCase()
) {

            console.log("Selecting:", text);
            await options.nth(i).scrollIntoViewIfNeeded();

            await options.nth(i).click();

            optionFound = true;

            break;
        }
    }
/*
    if (!optionFound) {

        console.log(`Option "${value}" not found.`);

        await this.page.keyboard.press("Escape");

    }
        */
       if (!optionFound) {

    console.log(
        `Option "${value}" not found. Selecting first available option.`
    );

    if (count > 0) {

        const firstOption = options.first();

        const firstValue = (await firstOption.innerText()).trim();

        console.log(`Selected First Option: ${firstValue}`);

        await firstOption.click();

    } else {

        throw new Error("Dropdown has no options.");

    }
}

}
    }

   
