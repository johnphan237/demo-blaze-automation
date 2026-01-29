import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly placeOrderButton: Locator;

    // Place Order Modal
    readonly nameInput: Locator;
    readonly countryInput: Locator;
    readonly cityInput: Locator;
    readonly cardInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly purchaseButton: Locator;

    // Success Message
    readonly successMessage: Locator;
    readonly okButton: Locator;

    constructor(page: Page) {
        super(page);
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });

        this.nameInput = page.locator('#name');
        this.countryInput = page.locator('#country');
        this.cityInput = page.locator('#city');
        this.cardInput = page.locator('#card');
        this.monthInput = page.locator('#month');
        this.yearInput = page.locator('#year');

        this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
        this.successMessage = page.locator('.sweet-alert'); // The sweet alert container
        this.okButton = page.getByRole('button', { name: 'OK' });
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }

    async fillOrderDetails(details: { name: string, country: string, city: string, card: string, month: string, year: string }) {
        await this.nameInput.fill(details.name);
        await this.countryInput.fill(details.country);
        await this.cityInput.fill(details.city);
        await this.cardInput.fill(details.card);
        await this.monthInput.fill(details.month);
        await this.yearInput.fill(details.year);
    }

    async submitOrder() {
        await this.purchaseButton.click();
    }

    async checkProductInCart(productName: string): Promise<boolean> {
        const product = this.page.locator(`//td[contains(text(), '${productName}')]`);
        return await product.isVisible();
    }
}
