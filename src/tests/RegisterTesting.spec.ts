import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { MailSlurpClient } from '../utils/MailSlurpClient';
import Helpers from '../utils/Helpers';

test.describe('Register tests', () => {
    let registerPage: RegisterPage;
    let homePage: HomePage;
    let loginPage: LoginPage;
    const loginUrl = process.env.URL;

    test.beforeEach(async ({ page }) => {
        const apiKey = process.env.APIKEY;
        const mailslurp = new MailSlurpClient(apiKey);
        registerPage = new RegisterPage(page, mailslurp);
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);

    });

    test('should register successfully', async ({ page }) => {
        await page.goto(loginUrl!);
        await registerPage.register('Testing12345*');
        await registerPage.organizationRegister('Colombia', 'Antioquia', 'Medellín', '050020', Helpers.generatePhoneNumber('310'))
        await loginPage.skipPopUp();
        expect(await homePage.verifyWelcomeLabel()).toBeTruthy();
        console.log('INFO -- Prueba finalizada correctamente')
    });

});