import { Page, Locator } from '@playwright/test';


export class MandatoryFieldInfoUtil {

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

       console.log("******** MandatoryFieldInfoUtil Loaded ********");
    }
      
      async getMandatoryFieldCount(jsonData: Record<string, any>) {


    // Handle Business Unit First


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
       // console.log(`${index + 1}. ${field}`);
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

        // console.log(
        //     `Field: ${fieldName} | Type: ${controlType} | Value: ${value}`
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

        await this.handleDropdown(
            controlContainer,
            String(value)
        );

        break;


    case "MULTISELECT":

        await this.handleMultiSelect(
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
       
private async findControlContainer(
    label: Locator
): Promise<Locator> {

    // First: check the element immediately after label
    const directSibling = label.locator(
        "xpath=following-sibling::*[1]"
    );

    if (await directSibling.count() > 0) {

        console.log(
            "Direct sibling found:",
            await directSibling.evaluate(
                el => el.tagName
            )
        );

        return directSibling;
    }

    // Second: check the parent structure
    const parentDivContainer = label.locator(
        "xpath=parent::div/following-sibling::*[1]"
    );

    if (await parentDivContainer.count() > 0) {
        return parentDivContainer;
    }

    return label.locator("xpath=..");
}
       
async identifyControlType(
    control: Locator
): Promise<string> {

    // MULTISELECT
    if (
        await control.locator("p-multiselect").count() > 0 ||
        await control.evaluate(
            el => el.tagName.toLowerCase() === "p-multiselect"
        ).catch(() => false)
    ) {
        return "MULTISELECT";
    }

    // DROPDOWN
    if (
        await control.locator("p-dropdown").count() > 0 ||
        await control.evaluate(
            el => el.tagName.toLowerCase() === "p-dropdown"
        ).catch(() => false)
    ) {
        return "DROPDOWN";
    }

    // CHECKBOX
    if (
        await control.locator(
            'input[type="checkbox"]'
        ).count() > 0
    ) {
        return "CHECKBOX";
    }

    // DATE
    if (
        await control.locator(
            "input[bsdatepicker]"
        ).count() > 0
    ) {
        return "DATETIME";
    }

    // TEXTBOX
    if (
        await control.locator(
            "input:not([readonly]), textarea"
        ).count() > 0
    ) {
        return "TEXTBOX";
    }

    return "UNKNOWN";
}
async handleMultiSelect(
    controlContainer: Locator,
    value: string
) {

    console.log("========== MULTISELECT START ==========");

    console.log("Value received:", value);

    // controlContainer is already <p-multiselect>
    const multiSelect = controlContainer;

    console.log(
        "MultiSelect count:",
        await multiSelect.count()
    );

    await multiSelect
        .locator(".p-multiselect-trigger")
        .click();

    console.log("MultiSelect opened");

    const options = this.page.locator(
        ".p-multiselect-panel:visible li.p-multiselect-item"
    );

    await options.first().waitFor({
        state: "visible",
        timeout: 15000
    });

    console.log(
        "Options count:",
        await options.count()
    );

    const values = value
        .split(",")
        .map(v => v.trim())
        .filter(Boolean);

    console.log(
        "Values to select:",
        values
    );

    for (const expectedValue of values) {

        console.log(
            "Looking for:",
            expectedValue
        );

        const option = options
            .filter({
                hasText: expectedValue
            })
            .first();

        console.log(
            "Option count:",
            await option.count()
        );

        if (await option.count() > 0) {

            await option.click();

            console.log(
                "Selected:",
                expectedValue
            );

        } else {

            throw new Error(
                `MultiSelect option "${expectedValue}" not found`
            );
        }
    }

    await this.page.keyboard.press("Escape");

    console.log(
        "========== MULTISELECT COMPLETE =========="
    );
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
            "bs-datepicker-container td span:not(.is-other-month)"
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

async handleDropdown(
    controlContainer: Locator,
    value: string
) {

    await controlContainer
        .locator(".p-dropdown-trigger")
        .click();

    const options = this.page.locator(
        ".p-dropdown-panel:visible li.p-dropdown-item"
    );

    await options.first().waitFor({
        state: "visible",
        timeout: 15000
    });

    const count = await options.count();

    let optionFound = false;

    for (let i = 0; i < count; i++) {

        const text = (
            await options.nth(i).innerText()
        ).trim();

        if (
            text.toLowerCase() ===
            value.trim().toLowerCase()
        ) {

            console.log(
                "Selecting:",
                text
            );

            await options
                .nth(i)
                .scrollIntoViewIfNeeded();

            await options.nth(i).click();

            optionFound = true;

            break;
        }
    }

    if (!optionFound) {

        console.log(
            `Option "${value}" not found. Selecting first available option.`
        );

        if (count > 0) {

            const firstOption = options.first();

            const firstValue = (
                await firstOption.innerText()
            ).trim();

            console.log(
                `Selected First Option: ${firstValue}`
            );

            await firstOption.click();

        } else {

            throw new Error(
                "Dropdown has no options."
            );
        }
    }
}
    }

   
