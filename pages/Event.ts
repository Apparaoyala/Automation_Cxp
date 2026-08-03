import { Page, Locator } from '@playwright/test';

export class Event {

    private readonly page: Page;
    private readonly Event: Locator;
    private readonly clickFilter: Locator;
    private readonly EventDashBoard: Locator;
    private readonly ServiceRequest: Locator;
     private readonly menuHeader: Locator;
      private readonly alcHeader: Locator;
     private readonly serviceHeaders:Locator;
    // private readonly headerText: Locator;
   // private readonly EnterEventNum: Locator;
   //private readonly menuCard: Locator;
private readonly CreateEventBtn: Locator;

//menu service

private readonly SearchandAdd:Locator;

private readonly FilterICon:Locator;

private readonly GoButton:Locator;
private readonly ItemSelectBox:Locator;
private readonly SaveBtn:Locator;
private readonly CloseBtn:Locator;
private readonly FinalizeBtn:Locator;
private readonly ServiceCloseBtn:Locator;





    constructor(page: Page) {

        this.page = page;

        this.Event = page.locator('span').filter({ hasText: 'Create Event' }).first()
       this.CreateEventBtn= page.getByRole('button', { name: 'Create' })
       this .EventDashBoard=page.locator('span').filter({ hasText: 'dashboard' }).first()

       this.clickFilter=page.getByRole('searchbox', { name: 'Event #' })
       this.ServiceRequest= page.getByText('Service Request')
       this.menuHeader= this.page.locator('.header-fs', {
        hasText: 'Menu'
    }
    
);
this.alcHeader= this.page.locator('.header-fs', {
        hasText: 'Alcohol'     
    });
   

//menu servie


this.SearchandAdd=page.getByRole('button', { name: 'Search & Add' })
this.FilterICon= page.locator('span.p-element.material-symbols-outlined.cursor-pointer.filter-icon.icon-size:visible')
this.GoButton=page.getByRole('button', { name: 'Go' })
this.ItemSelectBox=page.locator('.p-checkbox-box');
this.SaveBtn=page.getByRole('button', { name: ' Save ' }).last()
this.CloseBtn=page.getByRole('button', { name: ' Close ' }).last()
this.FinalizeBtn=page.getByRole('button', { name: 'Finalize' })
this.ServiceCloseBtn=page.getByRole('button', { name: ' Close ' }).first()

this.serviceHeaders= page.locator(
  "//div[contains(@class,'header-fs') and contains(text(),'-')]"
);
       }

async CreateEvent() {

     await this.Event.click();
     
    }

    async createbtn(){
        await this.CreateEventBtn.click();
    }


    async clickFilter1() {

     await this.clickFilter.fill('3410');
     
    }
    async enterEventNumber() {

    await this.clickFilter.click(); 
     
    }
   async eventDashBoard(){
 await this.EventDashBoard.click();
    }
    async clickSearch() {

     await this.Event.click();
     
    }
    async openDashboard() {

     await this.Event.click();
     
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
    }
async itemSelectBox() {

    const count = await this.ItemSelectBox.count();

    let selected = 0;

    for (let i = 0; i < count; i++) {

        const checkbox = this.ItemSelectBox.nth(i);

        if (await checkbox.isVisible()) {

            await checkbox.click();

            selected++;

            if (selected === 10) {
                break;
            }
        }
    }

    console.log(`Selected ${selected} items`);
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



    async getCreatedEventNumber(): Promise<string> {

    const eventNumberLocator = this.page.locator(
        "//label[text()=' Event # ']//following-sibling::label[2]"
    );

    await eventNumberLocator.waitFor({
        state: "visible",
        timeout: 30000
    });

    let eventId = "";

    for (let i = 0; i < 10; i++) {

        eventId = (await eventNumberLocator.textContent())?.trim() ?? "";

        if (eventId !== "") {
            break;
        }

        await this.page.waitForTimeout(300);
    }

    console.log("Created Event Number:", eventId);

    return eventId;

}

async openEventDashboard() {
     console.log("openEventDashboard");

    await this.clickFilter1();

   // await this.enterEventNumber();

   // await this.clickSearch();

   // await this.openDashboard();
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

const checkbox = this.page
  .locator('div')
  .filter({
      has: this.page.getByText(
          'Show Items Mapped to Menu Items for this Event'
      )
  })
  .locator('.p-checkbox');
  console.log(await checkbox.count());

if (await checkbox.isChecked()) {

    console.log('Checkbox is checked. Unchecking...');

    await checkbox.uncheck();

} else {

    console.log('Checkbox already unchecked. Skipping...');

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

































}
