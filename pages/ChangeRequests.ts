import { Page, Locator } from '@playwright/test';

export class ChangeRequests {

    private readonly page: Page;
private readonly menuHeader: Locator;

private readonly OrderDropdown:Locator;
private readonly OrderDropdownclick:Locator;
private readonly AddItems:Locator;

    constructor(page: Page) {

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

        const changeRequestIcon =
            this.page.locator(
                "div.icon-circle:has(i.fa-exchange)"
            );

        await changeRequestIcon.waitFor({
            state: "visible"
        });

        await changeRequestIcon.click();

        console.log(
            "Change Request icon clicked"
        );

    } else {

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
async addEditItems(qty: string = "10") {

    await this.page
        .getByRole("button", {
            name: "Add/Edit Items"
        })
        .click();

    const qtyField = this.page
        .locator("tbody tr")
        .first()
        .locator("td")
        .nth(5)
        .locator("input");

    await qtyField.clear();
    await qtyField.fill(qty);

    console.log(`Qty entered: ${qty}`);

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
