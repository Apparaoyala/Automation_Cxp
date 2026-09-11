
import { Page, Locator, expect } from '@playwright/test';
import { FrameManager } from '../Utilities/FrameManager';
import { CommonActions } from '../Utilities/CommonActions';
import { Home } from '../pages/Home';
import { HomePage } from '../pages/HomePage';
export class WareHouse {
    private readonly page: Page;
    private readonly commonActions: CommonActions;
    private readonly home: Home;
    private readonly sentLink: Locator;
    private readonly EqpsentLink: Locator;
    private readonly AcceptBtn: Locator;
    private readonly BillBtn: Locator;
    private readonly CheckOut: Locator;
    private readonly CheckService: Locator;
    private readonly ClickCheckOut: Locator;
    private readonly Close: Locator;
    private readonly Checkin: Locator;
    private readonly ClickCheckIn: Locator;
    private readonly Reserve: Locator;

    constructor(page: Page) {
        this.page = page;
        const frameManager = new FrameManager(page);
        this.commonActions = new CommonActions(page);
        this.home = new Home(page);
        this.sentLink = page.frameLocator('frame[name="right"]').locator('td[title="Alcohol"] a');
        this.EqpsentLink = page.frameLocator('frame[name="right"]').locator('td[title="Equipment"] a');
        this.AcceptBtn = page.frameLocator('frame[name="right"]').getByRole('button', { name: 'Accept' });
        // this.BillBtn = page.frameLocator('frame[name="right"]').getByRole('button', { name: 'Bill' });
        this.BillBtn = page.frameLocator('frame[name="right"]').locator("//span[text()='Bill']");
        this.CheckOut = page.frameLocator('frame[name="header"]').getByRole('link', { name: 'Check Out' });
        this.CheckService = page.frameLocator('frame[name="view"]').locator('#ChkService');
        this.ClickCheckOut = page.frameLocator('frame[name="view"]').locator("#save_label").first();
        this.Close = page.frameLocator('frame[name="view"]').locator("//span[text()='Close']").first();
        this.Checkin = page.frameLocator('frame[name="header"]').getByRole('link', { name: ' Check In ' });

        this.ClickCheckIn = page.frameLocator('frame[name="view"]').locator("//span[text()='Check In']").first();
        this.Reserve = page
            .frameLocator('frame[name="right"]')
            .getByRole('button', { name: 'Reserve' });


    }


    async Warehouse_Alc() {

        await this.sentLink.click();
        await this.AcceptBtn.click();

        const isBillVisible = await this.BillBtn.isVisible();
        const isReserveVisible = await this.Reserve.isVisible();
        const isCheckoutVisible = await this.CheckOut.isVisible();

        console.log(
            `Bill=${isBillVisible}, Reserve=${isReserveVisible}, Checkout=${isCheckoutVisible}`
        );

        if (isBillVisible) {

            console.log("Warehouse: Direct Bill");

            await this.commonActions.clickBillAndAcceptAlerts(this.BillBtn);

        } else if (isReserveVisible) {

            console.log("Warehouse: Reserve → Checkout → Bill");

            console.log("Reserve Flow");

        const dialogHandler = async (dialog: any) => {
            console.log("Reserve Alert:", dialog.message());
            await dialog.accept();
        };

        this.page.once('dialog', dialogHandler);

        await this.Reserve.click();
            await this.CheckOut.click();
            await this.CheckService.check();
            await this.ClickCheckOut.click();
            await this.Close.click();

            await this.commonActions.clickBillAndAcceptAlerts(this.BillBtn);

        } else{

            console.log("Warehouse: Checkout → Bill");

            await this.CheckOut.click();
            await this.CheckService.check();
            await this.ClickCheckOut.click();
            await this.Close.click();

            await this.commonActions.clickBillAndAcceptAlerts(this.BillBtn);

        } 
    }

    async Warehouse_Eqp() {

        await this.EqpsentLink.click();
        await this.AcceptBtn.click();

        const isBillVisible = await this.BillBtn.isVisible();
        const isReserveVisible = await this.Reserve.isVisible();
        const isCheckoutVisible = await this.CheckOut.isVisible();

        console.log(
            `Bill=${isBillVisible}, Reserve=${isReserveVisible}, Checkout=${isCheckoutVisible}`
        );

        if (isBillVisible) {

            console.log("Warehouse_Eqp: Direct Bill");

            await this.commonActions.clickBillAndAcceptAlerts(this.BillBtn);

        } else if (isReserveVisible) {

            console.log("Warehouse: Reserve → Checkout → Bill");

            console.log("Reserve Flow");

        const dialogHandler = async (dialog: any) => {
            console.log("Reserve Alert:", dialog.message());
            await dialog.accept();
        };

        this.page.once('dialog', dialogHandler);

        await this.Reserve.click();
            await this.CheckOut.click();
            await this.CheckService.check();
            await this.ClickCheckOut.click();
            await this.Close.click();
            await this.Checkin.click();
            await this.CheckService.click();
            await this.ClickCheckIn.click();
            await this.Close.click()

            await this.commonActions.clickBillAndAcceptAlerts(this.BillBtn);

        } else{

            console.log("Warehouse: Checkout → Bill");

            await this.CheckOut.click();
            await this.CheckService.click();
            await this.ClickCheckOut.click();
            await this.Close.click();
            await this.Checkin.click();
            await this.CheckService.click();
            await this.ClickCheckIn.click();
            await this.Close.click();
            await this.commonActions.clickBillAndAcceptAlerts(this.BillBtn);

        } 
        }
    }
