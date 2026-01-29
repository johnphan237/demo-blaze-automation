import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
    }

    async addToCart() {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.addToCartButton.click();
        const dialog = await dialogPromise;
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
        await this.page.waitForTimeout(1000); // Wait for cart update
    }
}
