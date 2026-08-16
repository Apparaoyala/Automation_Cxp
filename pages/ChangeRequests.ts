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
const searchInputs = this.page.locator(
    'tbody tr:first-child input[type="search"]'
);

console.log(
    await searchInputs.count()
);
await searchInputs.nth(0).fill("22");

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
