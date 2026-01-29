import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { UserHelper } from '../utils/UserHelper';

test.describe('Login Functionality', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let testUser: { username: string; password: string };

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        testUser = UserHelper.generateRandomUser();

        // Register a new user before testing login
        await homePage.navigateTo();
        await homePage.openSignUpModal();
        await loginPage.signUp(testUser.username, testUser.password);

        // Handle the "Sign up successful" alert
        page.once('dialog', async dialog => {
            await dialog.accept();
        });

        // Small wait to ensure modal is closed/ready? 
        // Usually clicking "Sign up" triggers alert then closes.
        // We might need to reload or just wait.
        await page.waitForTimeout(1000);
        await page.reload(); // Ensure modal is closed/cleared
    });

    test('TC_LOG_01: Verify successful login with valid credentials', async ({ page }) => {
        await homePage.openLoginModal();
        await loginPage.login(testUser.username, testUser.password);

        await expect(page.locator('#nameofuser')).toBeVisible();
        await expect(page.locator('#nameofuser')).toContainText(`Welcome ${testUser.username}`);
    });

    test('TC_LOG_02: Verify login failure with invalid username', async ({ page }) => {
        await homePage.openLoginModal();

        // Listen for alert
        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('User does not exist.');
            await dialog.accept();
        });

        await loginPage.login('invalid_user_' + Date.now(), testUser.password);
    });

    test('TC_LOG_03: Verify login failure with invalid password', async ({ page }) => {
        await homePage.openLoginModal();

        // Listen for alert
        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Wrong password.');
            await dialog.accept();
        });

        await loginPage.login(testUser.username, 'wrong_password');
    });
});
