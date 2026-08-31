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
      
      async getMandatoryFieldCount(jsonData: Record<string, any>) {


    // Handle Business Unit First

    const buValue = jsonData["Business Unit"];

    if (buValue) {

        const buLabel = this.page.locator(
            "//label[contains(normalize-space(),'Business Unit')]"
        );

        const buContainer =
            await this.findControlContainer(buLabel);

        await this.handleDropdown(
            buContainer,
            String(buValue)
        );

        console.log(
            "Business Unit Selected:",
            buValue
        );

        // Wait for screen refresh
    
        await this.page.locator("ngx-spinner .overlay")
            .waitFor({
                state: "hidden",
                timeout: 30000
            });
        
    }

    // STEP 2: Read Mandatory Fields AFTER BU

    const mandatoryLabels = this.page.locator(
        "//label[.//span[contains(@class,'text-danger')]]"
    );

    const count = await mandatoryLabels.count();

    console.log("Mandatory Count :", count);

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

    console.log(
        "\nTotal Mandatory Fields :",
        mandatoryFieldNames.length
    );


// Fill Mandatory Fields


    for (let i = 0; i < count; i++) {

        const label = mandatoryLabels.nth(i);

        const fieldName =
            (await label.textContent())
                ?.replace("*", "")
                .trim();

        if (!fieldName) {
            continue;
        }

        // Skip Business Unit
        if (
            fieldName.toLowerCase() ===
            "business unit"
        ) {
            continue;
        }

        const value = jsonData[fieldName];

        if (value === undefined) {
            continue;
        }

        const controlContainer =
            await this.findControlContainer(label);

        const controlType =
            await this.identifyControlType(
                controlContainer
            );

        console.log(
            `Field: ${fieldName} | Type: ${controlType} | Value: ${value}`
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

            default:

                console.log(
                    `Unknown Control Type: ${fieldName}`
                );

                break;
        }
    }
}
       
private async findControlContainer(label: Locator): Promise<Locator> {

    const fieldName = await label.textContent();

    

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
        .locator(
            "//td[@role='gridcell']//span[not(contains(@class, 'is-other-month'))]"
        )
        .filter({
            hasText: String(Number(day))
        })
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
   

    for (let i = 0; i < count; i++) {

        const option = this.page.locator("span.time-hover").nth(i);
        const text = (await option.innerText()).trim();

    

        if (text === clockTime) {

            await option.scrollIntoViewIfNeeded();

            await option.click({ force: true });

            console.log("Time Selected:", text);

            break;
        }
    }
}

async handleDropdown(controlContainer: Locator, value: string) {

   

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


    let optionFound = false;

    for (let i = 0; i < count; i++) {

        const text = (await options.nth(i).innerText()).trim();

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

   
