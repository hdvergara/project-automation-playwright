import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test.describe('Login and Home tests', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    const loginUrl = process.env.URL;
  
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      homePage = new HomePage(page);
     
    });
  
    test('should login successfully', async ({ page }) => {
      const username = process.env.USER_NAME;
      const password = process.env.PASSWORD;
      await page.goto(loginUrl!);
      await loginPage.enterEmail(username!);
      await loginPage.enterPassword(password!);
      await loginPage.clickOnLoginButton();
      await loginPage.skipPopUp();
      expect(await homePage.verifyWelcomeLabel()).toBeTruthy();
      console.log('INFO -- Prueba finalizada correctamente')
    });

    test('No login with wrong data', async ({page}) =>{
      await page.goto(loginUrl!);
      await loginPage.enterEmail('test@test.com');
      await loginPage.enterPassword('password!');
      await loginPage.clickOnLoginButton();
      expect(await loginPage.showLblLoginError()).toBeTruthy();
      console.log('INFO -- Prueba finalizada correctamente')
    })
  });