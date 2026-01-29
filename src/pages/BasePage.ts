import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(path: string = '/') {
        await this.page.goto(path);
    }

    async acceptAlert() {
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
    }
}
