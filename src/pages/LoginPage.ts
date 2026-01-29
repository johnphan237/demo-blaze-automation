import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    // Sign Up Selectors (reusing this page for simplicity or separation?)
    // Let's keep robust
    readonly signUpUsernameInput: Locator;
    readonly signUpPasswordInput: Locator;
    readonly signUpButton: Locator;


    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });

        this.signUpUsernameInput = page.locator('#sign-username');
        this.signUpPasswordInput = page.locator('#sign-password');
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async signUp(username: string, password: string) {
        await this.signUpUsernameInput.fill(username);
        await this.signUpPasswordInput.fill(password);
        await this.signUpButton.click();
    }
}
