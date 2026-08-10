import { Page, Locator } from '@playwright/test';
import { JsonUtil } from '../Utilities/JsonUtil';
import { MandatoryFieldInfoUtil } from '../Utilities/MandatoryFieldInfoUtil';

export class Services {


    private readonly page: Page;
     private readonly ServiceRequest: Locator;
     private readonly menuHeader: Locator;
          private readonly serviceHeaders:Locator;
    // private readonly headerText: Locator;
   // private readonly EnterEventNum: Locator;
   //private readonly menuCard: Locator;
   
//menu service

private readonly SearchandAdd:Locator;
private readonly FilterICon:Locator;
private readonly GoButton:Locator;
private readonly ItemSelectBox:Locator;
private readonly SaveBtn:Locator;
private readonly CloseBtn:Locator;
private readonly FinalizeBtn:Locator;
private readonly ReserveBtn:Locator;
private readonly ServiceCloseBtn:Locator;

//Alc service

 private readonly alcHeader: Locator;

//equip service

  private readonly EquipHeader: Locator;

  private readonly OkButton:Locator;

  //scheduling service

  private readonly SchHeader: Locator;

  //finalize
  private mandatoryFieldInfoUtil: MandatoryFieldInfoUtil;

 constructor(page: Page) {

        this.page = page;
        this.ServiceRequest= page.getByText('Service Request')
       this.menuHeader= this.page.locator('.header-fs', {
        hasText: 'Menu'
    }
    
);
this.alcHeader= this.page.locator('.header-fs', {
        hasText: 'Alcohol'     
    });
   this.EquipHeader= this.page.locator('.header-fs', {
        hasText: 'Equipment'     
    });
   
    this.SchHeader= this.page.locator('.header-fs', {
        hasText: 'Scheduling'     
    });

//menu servie


this.SearchandAdd=page.getByRole('button', { name: 'Search & Add' })
this.FilterICon= page.locator('span.p-element.material-symbols-outlined.cursor-pointer.filter-icon.icon-size:visible')
this.GoButton=page.getByRole('button', { name: 'Go' })
this.ItemSelectBox=page.locator('.p-checkbox-box');
this.SaveBtn=page.getByRole('button', { name: ' Save ' }).last()
this.CloseBtn=page.getByRole('button', { name: ' Close ' }).last()
this.FinalizeBtn=page.getByRole('button', { name: 'Finalize' })
this.ReserveBtn=page.getByRole('button', { name: 'Reserve' })
this.ServiceCloseBtn=page.getByRole('button', { name: ' Close ' }).first()

this.serviceHeaders= page.locator(
  "//div[contains(@class,'header-fs') and contains(text(),'-')]"
);
       
this.OkButton = page.getByRole('button', {
    name: 'Ok'
});



 this.mandatoryFieldInfoUtil =
            new MandatoryFieldInfoUtil(page);


 }

 
async serviceRequest() {

     await this.ServiceRequest.click();
     
     
    }

//menu service



 async searchandAdd() {

     await this.SearchandAdd.click();
     
     
    }

async filterICon() {

     await this.FilterICon.click();
    }
async goButton() {

     await this.GoButton.click();
     await this.page.screenshot({
  path: "after-go.png",
  fullPage: true
});

const rows = this.page.locator("tbody tr");

console.log("Rows:", await rows.count());

const firstRow = rows.first();


    }
async itemSelectBox() {

    const checkboxes = this.page.locator(
        "tbody tr p-checkbox"
    );

    const count = await checkboxes.count();

    console.log("Checkboxes:", count);

    const limit = Math.min(count, 5);

    for (let i = 0; i < limit; i++) {

        await checkboxes
            .nth(i)
            .locator(".p-checkbox-box")
            .click({ force: true });

        console.log(`Clicked checkbox ${i}`);
    }
}
async processServiceRows() {

  const menuRows = this.page.locator(
    "tbody tr:has(p-dropdown[id^='mennu_'])"
);

console.log(
    "Menu Rows:",
    await menuRows.count()
);

    const rowCount = await menuRows.count();

    for(let i=0; i<1; i++) {

        const row = menuRows.nth(i);

        const menuValue = await row
            .locator("p-dropdown[id^='mennu_'] .p-dropdown-label")
            .textContent();

        if(menuValue?.trim() === "- Select -") {

            // Open Menu Dropdown
            await row
                .locator("p-dropdown[id^='mennu_'] .p-dropdown-trigger")
                .click();

            await this.page
                .locator("li.p-dropdown-item")
                .nth(2)
                .click();
        }

        const courseValue = await row
            .locator("p-dropdown[id^='cours_'] .p-dropdown-label")
            .textContent();

        if(courseValue?.trim() === "- Select -") {

            await row
                .locator("p-dropdown[id^='cours_'] .p-dropdown-trigger")
                .click();

            await this.page
                .locator("li.p-dropdown-item")
                .nth(2)
                .click();
        } else{
            
         // Checkbox
        await row
            .locator("div.p-checkbox-box")
            .click({ force: true });
    
        }

       
    } 
}
async saveBtn() {

     await this.SaveBtn.click();
    }

async closeBtn() {

     await this.CloseBtn.click();
    }


async finalizeBtn() {

     await this.FinalizeBtn.click();


    }
async serviceCloseBtn() {

     await this.ServiceCloseBtn.click();
    }
async menuServiceStatus(){
    const statusText = await this.menuHeader.textContent();

console.log(statusText);
if (statusText?.includes('Sent')) {

    console.log("✅ Menu Service Sent");

}
else {

    console.log("❌ Menu Service Not Sent");

}
}
 async AlcServiceStatus(){
    const statusText = await this.alcHeader.textContent();

console.log(statusText);
if (statusText?.includes('Sent')) {

    console.log("✅ Alc Service Sent");

}
else {

    console.log("❌ Alc Service Not Sent");

}
}
async openMenuService() {

    const headerText = await this.menuHeader.textContent();

    console.log(headerText);

    const menuCard = this.page.locator('.card').filter({
    has: this.page.getByText('Menu -')
});
const serviceIcon =
menuCard.locator('.service-request .icon-circle').first();
console.log(await menuCard.locator('.icon-circle').count());
// Step 3: If Menu is New
    if (headerText?.includes('New')) {

        console.log("Menu is New");

        // Find Menu Card
       

        // Click Service Request inside Menu card
        

       await serviceIcon.click();
    }
    // Step 4: If Menu is Prog
    else if (headerText?.includes('Prog')) {

        console.log("Menu is In Progress");
         await serviceIcon.click();
        // Future logic
    }
    // Step 5: If Menu is None
    else {

        console.log("Menu Service Not Available");

    }


}



async AllServiceStatuses() {

 const count = await this.serviceHeaders.count();

    const headers =
        await this.serviceHeaders.allTextContents();

    const services = headers.filter(
        x => x.includes('-')
    );

    for (const service of services) {

        const parts = service.split('-');

        const serviceName = parts[0].trim();
        const status = parts[1].trim();

        console.log(
            `${serviceName} => ${status}`
        );
    }
}

//alc service

async openAlcService() {

    const headerText = await this.alcHeader.textContent();

    console.log(headerText);

    const alcCard = this.page.locator('.card').filter({
    has: this.page.getByText('Alcohol  -')
});
const serviceIcon =
alcCard.locator('.service-request .icon-circle').first();
console.log(await alcCard.locator('.icon-circle').count());
// Step 3: If Alc is New
    if (headerText?.includes('New')) {

        console.log("Alc is New");

       await serviceIcon.click();
    }
    // Step 4: If Alc is Prog
    else if (headerText?.includes('Prog')) {

        console.log("Alc is In Progress");
         await serviceIcon.click();
        // Future logic
    }
    // Step 5: If Menu is None
    else {

        console.log("Alc Service Not Available");

    }

await this.SearchandAdd.click();

await this.FilterICon.click();

try {

    await this.page.locator("//div[@role='region']//div[@class = 'p-checkbox-box p-highlight']").click();

    console.log("Unchecked");

} catch (e) {

    console.log("Click Failed:", e);
}

await this.GoButton.click();

// Select All
const selectAll = this.page.locator(
    'p-checkbox[inputid="binary"] .p-checkbox'
);

await selectAll.click();

// Qty Inputs
const qtyInputs = this.page.locator(
    'input[id^="qts_"]'
);

const count = await qtyInputs.count();

for (let i = 0; i < count; i++) {

    await qtyInputs.nth(i).fill('25');
}
await this.SaveBtn.click();

await this.CloseBtn.click();

await this.FinalizeBtn.click();

 await this.ServiceCloseBtn.click();

}

//Equipment service

async EquipService() {
    

    const headerText = await this.EquipHeader.textContent();

    console.log(headerText);

    const EqpCard = this.page.locator('.card').filter({
    has: this.page.getByText('Equipment  -')
});
const serviceIcon =
EqpCard.locator('.service-request .icon-circle').first();
console.log(await EqpCard.locator('.icon-circle').count());
// Step 3: If Eqp is New
    if (headerText?.includes('New')) {

        console.log("Eqp is New");

       await serviceIcon.click();
    }
    // Step 4: If Eqp is Prog
    else if (headerText?.includes('Prog')) {

        console.log("Eqp is In Progress");
         await serviceIcon.click();
        // Future logic
    }
    // Step 5: If Eqp is None
    else {

        console.log("Eqp Service Not Available");

    }

await this.SearchandAdd.click();

await this.FilterICon.click();

try {

    await this.page.locator("//div[@role='region']//div[@class = 'p-checkbox-box p-highlight']").click();

    console.log("Unchecked");

} catch (e) {

    console.log("Click Failed:", e);
}

await this.GoButton.click();

// Select All
const selectAll = this.page.locator(
    'p-checkbox[inputid="binary"] .p-checkbox'
);

await selectAll.click();

// just dbug

const qtyInputs = this.page.locator(
  'input[id^="eqp_"]'
);

const count = await qtyInputs.count();

for(let i = 0; i < count; i++){

   await qtyInputs.nth(i).fill('20');
}




await this.SaveBtn.click();

if (await this.OkButton.isVisible()) {

    await this.OkButton.click();

    console.log("Inventory Alert Accepted");
}

await this.CloseBtn.click();

// Reserve button optional
try {

    if (await this.ReserveBtn.isVisible()) {

        console.log("Reserve Button Displayed");

        await this.ReserveBtn.click();

        await this.OkButton.click();

        console.log("Stock Reserved");
    }

} catch {

    console.log("Reserve Button Not Displayed");

}

await this.FinalizeBtn.click();

 await this.ServiceCloseBtn.click();


}


async openSchService() {

    const headerText = await this.SchHeader.textContent();

    console.log(headerText);

    const schCard = this.page.locator('.card').filter({
    has: this.page.getByText('Scheduling  -')
});
const serviceIcon =
schCard.locator('.service-request .icon-circle').first();
console.log(await schCard.locator('.icon-circle').count());
// Step 3: If Alc is New
    if (headerText?.includes('New')) {

        console.log("Sch is New");

       await serviceIcon.click();
    }
    // Step 4: If Alc is Prog
    else if (headerText?.includes('Prog')) {

        console.log("Sch is In Progress");
         await serviceIcon.click();
        // Future logic
    }
    // Step 5: If Sch is None
    else {

        console.log("Sch Service Not Available");

    }

const qtyInputs2 = this.page.locator("//tbody/tr/td[2]/input");

for (let i = 0; i < 5; i++) {

    await qtyInputs2.nth(i).fill("1");
}

await this.SaveBtn.click();

await this.FinalizeBtn.click();

 await this.ServiceCloseBtn.click();

}






//constraints
async isServiceConstraintDisplayed(): Promise<boolean> {

    const constraintTitle = this.page.getByText(
        "Service Constraints",
        { exact: true }
    );

    try {
        await constraintTitle.waitFor({
            state: "visible",
            timeout: 5000
        });

        console.log("Service Constraint displayed");
        return true;

    } catch {

        console.log("Service Constraint not displayed");
        return false;
    }
}
async infoSaveBtn() {

    const saveButton = this.page
        .getByRole('button', { name: 'Save' })
        .last();

    await saveButton.click();

    console.log("Info Save button clicked");
}


async serviceConstraintSaveBtn() {

console.log("Service Constraint");
    const sidebar = this.page.locator("p-sidebar").filter({
        hasText: "Service Constraints"
    });


    await sidebar
        .getByRole("button", { name: "Save" })
        .click();

    console.log("Service Constraint Save clicked");
}
async isInfoDisplayed(): Promise<boolean> {

    const infoHeader = this.page.locator(
        "p",
        { hasText: "Info for Event" }
    ).first();

    try {

        await infoHeader.waitFor({
            state: "visible",
            timeout: 5000
        });

        console.log("Info screen detected");

        return true;

    } catch {

        console.log("Info screen not detected");

        return false;
    }
}
async handleInfo() {
   const infoData = JsonUtil.readJson(
       "./Utilities/TestData/Info.json"
   );

   await this.mandatoryFieldInfoUtil
       .getMandatoryFieldCount(infoData);

   await this.infoSaveBtn();
}
async processFinalizeWorkflow() {

    // Step 1: Click Finalize
    await this.finalizeBtn();

    // Step 2: Check Constraint
    const constraintDisplayed =
        await this.isServiceConstraintDisplayed();

    if (constraintDisplayed) {

        console.log("Service Constraint detected");

        await this.serviceConstraintSaveBtn();

        console.log(
            "Constraint saved."
        );

        // Constraint can lead to Info
        // So check Info AFTER saving Constraint
        if (await this.isInfoDisplayed()) {

            console.log(
                "Info screen displayed after Constraint."
            );

            const infoData = JsonUtil.readJson(
                "./Utilities/TestData/Info.json"
            );

            await this.mandatoryFieldInfoUtil
                .getMandatoryFieldCount(infoData);

            await this.infoSaveBtn();

            console.log(
                "Info saved. Event moved to Pending."
            );

        } else {

            console.log(
                "No Info after Constraint. Event moved to Pending."
            );
        }

    } else {

        // No Constraint
        // Check whether Info appears directly
        if (await this.isInfoDisplayed()) {

            console.log(
                "Info screen displayed directly."
            );

            const infoData = JsonUtil.readJson(
                "./Utilities/TestData/Info.json"
            );

            await this.mandatoryFieldInfoUtil
                .getMandatoryFieldCount(infoData);

            await this.infoSaveBtn();

            console.log(
                "Info saved. Event moved to Pending."
            );

        } else {

            console.log(
                "No Constraint and no Info. Finalize completed."
            );
        }
    }

    console.log("Finalize workflow completed");
}

}