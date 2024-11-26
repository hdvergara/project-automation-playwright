import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import Helpers from '../utils/Helpers';
import { CyborgOptionsPage } from '../pages/Cyborg/CyborgOptionPage';
import { AttentionConfigurationPage } from '../pages/Cyborg/AttentionConfigurationPage';

test.describe('Testing functionality BotBuilder and BotBasico', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let cyborgOptionsPage: CyborgOptionsPage;
    let attentionConfigurationPage: AttentionConfigurationPage;
    const loginUrl = process.env.URL;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        cyborgOptionsPage = new CyborgOptionsPage(page);
        attentionConfigurationPage = new AttentionConfigurationPage(page);
    });

    test('Create simple BotBuilder', async ({ page }) => {
        const username = process.env.USER_NAME;
        const password = process.env.PASSWORD;

        await page.goto(loginUrl!);
        await loginPage.enterEmail('qa010analyst@gmail.com');
        await loginPage.enterPassword('Ip12369*');
        await loginPage.clickOnLoginButton();
        await loginPage.skipPopUp();
        expect(await homePage.verifyWelcomeLabel()).toBeTruthy();
        await cyborgOptionsPage.clickOnCyborgOption();
        await cyborgOptionsPage.clickOnAttentionConfiguration();
        await attentionConfigurationPage.validateTitleNewAttentionConfigurationDisplayed();
        await attentionConfigurationPage.validateButtonCreateDisplayed();
        await attentionConfigurationPage.clickOnCreateNewConfiguration();
        await attentionConfigurationPage.validateBotbuilderCardDisplayed();
        //await attentionConfigurationPage.validateBotBasicCardDisplayed();
        await attentionConfigurationPage.clickOnBotBuilderCard();
        await attentionConfigurationPage.fillTitle('Test Bot Builder');
        await attentionConfigurationPage.clickOnContinueButton();
        await expect(page.getByText('Para utilizar tu Bot en el')).toBeVisible();
        await attentionConfigurationPage.clickOnContinueButton();
        await attentionConfigurationPage.setFlow();
        await attentionConfigurationPage.clickOnContinueButton();
        await attentionConfigurationPage.clickOnSaveButton();
        await expect(page.getByRole('dialog')).toBeVisible();
    })

});   