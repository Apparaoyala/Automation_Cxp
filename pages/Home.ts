import { Page } from '@playwright/test';
import { FrameManager } from '../Utilities/FrameManager';

export class Home {

  private frames: FrameManager;

  constructor(private page: Page) {
    this.frames = new FrameManager(page);
  }

  // Header
  homeButton = '//img[@alt="Home"]';
  logoutButton = '//img[@alt="Logout"]';

  // Menus
  salesMenu = '//a[contains(text(),"Sales")]';
  salesMenu2 = '(//a[contains(text(),"Sales")])[2]';
  corporateSales = '//a[contains(text(),"Corporate Sales")]';

  kitchenMenu = '//a[contains(text(),"Kitchen")]';
  accountingMenu = '//a[contains(text(),"Accounting")]';
  schedulingMenu = '//a[contains(text(),"Scheduling")]';
  warehouseMenu = '//a[contains(text(),"Warehouse")]';

  async navigateToHome() {
    await this.frames
      .headerFrame()
      .locator(this.homeButton)
      .click();
  }

  async navigateToSales() {

    await this.navigateToHome();

    const rightFrame = this.frames.rightFrame();

    if (
      await rightFrame
        .locator(this.corporateSales)
        .isVisible()
        .catch(() => false)
    ) {
      await rightFrame.locator(this.salesMenu2).click();
    } else {
      await rightFrame.locator(this.salesMenu).click();
    }
  }

  async navigateToKitchen() {

    await this.navigateToHome();

    await this.frames
      .rightFrame()
      .locator(this.kitchenMenu)
      .click();

      
  }

  async navigateToAccounting() {

    await this.navigateToHome();

    await this.frames
      .rightFrame()
      .locator(this.accountingMenu)
      .click();
  }

  async navigateToScheduling() {

    await this.navigateToHome();

    await this.frames
      .rightFrame()
      .locator(this.schedulingMenu)
      .click();
  }

  async navigateToWarehouse() {

    await this.navigateToHome();

    await this.frames
      .rightFrame()
      .locator(this.warehouseMenu)
      .click();
  }
}