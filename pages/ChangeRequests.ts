import { Page, Locator } from '@playwright/test';
import { Approvals } from '../pages/Approval';


export class ChangeRequests {

    private readonly page: Page;
private readonly menuHeader: Locator;

private readonly OrderDropdown:Locator;
private readonly OrderDropdownclick:Locator;
private readonly AddItems:Locator;

    constructor(page: Page) {
            const approval = new Approvals(page);


        this.page = page;
        
this.menuHeader= this.page.locator('.header-fs', {
        hasText: 'Menu'
    })
this.AddItems=page.getByRole('button',{name :' Add/Edit Items'})

    this.OrderDropdown=page.locator(".p-dropdown-trigger").last();
    this.OrderDropdownclick=page
    .locator("li.p-dropdown-item", {
        hasText: "Order 1"
    });
}

async MenuChangeRequest() {

    console.log("Menu Change Request");

    const headerText =
        await this.menuHeader.textContent();

    console.log("Header:", headerText);

    if (
        headerText?.toLowerCase().includes("sent")
    ) {

        console.log("Menu is Sent");
const menuCard = this.page.locator(".card").filter({
    has: this.page.getByText("Menu")
});
        await menuCard.locator("i.fa-exchange").click();
        
    }
    if (
        headerText?.toLowerCase().includes("pend")
    ) {

    //await approval.Approvals(eventNumber);
    
    }
    
    
    else {

        console.log(
            "Menu Service Not Available"
        );
    }
}

async MChangeRequest(){
  

    await this.OrderDropdown.click();
    await this.OrderDropdownclick.click();
     await this.page
        .locator('textarea[name="sentComm"]')
        .fill('test');

}
async addEditItems() {

    await this.page
        .getByRole("button", {
            name: "Add/Edit Items"
        })
        .click();
const headers = await this. page.locator("thead th").allTextContents();

const qtyIndex = headers.findIndex(
  h => h.trim() === "Qty"
);

if (qtyIndex === -1) {
  throw new Error("Qty column not found");
}

const qtyField = this.page
  .locator("tbody tr")
  .first()
  .locator("td")
  .nth(qtyIndex)
  .locator("input");

await qtyField.fill("5");
console.log(await qtyField.isVisible());
console.log(await qtyField.isEnabled());
console.log(await qtyField.isEditable());
console.log(await qtyField.inputValue());
   // await qtyField.clear();
   // await qtyField.fill(qty);

   // console.log(`Qty entered: ${qty}`);

    await this.page
        .getByRole("button", {
            name: "Save"
        })
        .click();

    await this.page
        .getByRole("button", {
            name: "Close"
        }).last()
        .click();

await this.page
        .getByRole("button", {
            name: " Send"
        })
        .click();
        await this.page
        .getByRole("button", {
            name: "Close"
        }).first()
        .click();
}

}
 









//
