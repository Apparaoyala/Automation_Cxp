import { Page, FrameLocator } from '@playwright/test';

export class FrameManager {
  constructor(private page: Page) {}

  headerFrame(): FrameLocator {
    return this.page.frameLocator('frame[name="header"]');
  }

  rightFrame(): FrameLocator {
    return this.page.frameLocator('frame[name="right"]');
  }
 ScheduleFrame(): FrameLocator {
    return this.page.frameLocator('frame[name="prsnlrequest"]');
  }
  viewFrame(): FrameLocator {
    return this.page.frameLocator('frame[name="view"]');
  }

  listFrame(): FrameLocator {
    return this.page.frameLocator('frame[name="list"]');
  }

  prsnlFrame(): FrameLocator {
    return this.page.frameLocator('#prsnlrequest');
  }

  prepItemFrame(): FrameLocator {
    return this.page.frameLocator('#prepItems');
  }
}