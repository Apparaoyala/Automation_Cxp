import { test as base } from '@playwright/test';
import { Customer } from './pages/Customer';

type CxpFixtures = {
    customer: Customer;
};

export const test = base.extend<CxpFixtures>({
    customer: async ({ page }, use) => {

        const customer = new Customer(page);

        await use(customer);
    }
});