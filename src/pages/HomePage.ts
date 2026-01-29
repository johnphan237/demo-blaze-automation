import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly loginLink: Locator;
    readonly signUpLink: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.cartLink = page.locator('#cartur'); // Use ID to avoid ambiguity with "Add to cart"
    }

    async openLoginModal() {
        await this.loginLink.click();
    }

    async openSignUpModal() {
        await this.signUpLink.click();
    }

    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForURL(/.*cart\.html/);
    }

    async clickProduct(productName: string) {
        await this.page.getByRole('link', { name: productName }).first().click();
        await this.page.waitForURL(/.*prod\.html.*/);
    }
}
