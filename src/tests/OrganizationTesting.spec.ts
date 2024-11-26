import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { OrganizationPage } from '../pages/Organizations/OrganizationPage';
import Helpers from '../utils/Helpers';
import { UsersPage } from '../pages/Organizations/UsersPage';

test.describe('Testing functionality organizations', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let organizationPage: OrganizationPage;
  let usersPage: UsersPage;
  const loginUrl = process.env.URL;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    organizationPage = new OrganizationPage(page);
    usersPage = new UsersPage(page); 
  });

  /*test.afterEach(async ({ browser }) => {
    await browser.close();
  });*/

  test('Test Create organization', async ({ page }) => {
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;
   
      await page.goto(loginUrl!);
      await loginPage.enterEmail(username!);
      await loginPage.enterPassword(password!);
      await loginPage.clickOnLoginButton();
      await loginPage.skipPopUp();
      expect(await homePage.verifyWelcomeLabel()).toBeTruthy();
      await organizationPage.clickOnOrganizations();
      await organizationPage.clikOnCreateOrganization();
      expect(organizationPage.isTitleNewOrganizationDisplayed, 'New Organization title should be visible').toBeTruthy();
      await organizationPage.setOrganizationName(faker.commerce.productName());
      await organizationPage.setEmail(faker.internet.exampleEmail());
      await organizationPage.setPhone(Helpers.generatePhoneNumber('310'));
      await organizationPage.setCountry('Colombia');
      await organizationPage.setState('Antioquia');
      await organizationPage.setCity('Medellin');
      await organizationPage.setAddress(faker.location.streetAddress());
      await organizationPage.setZipCode('050020');
      await organizationPage.clickOnSaveButton();
      expect(await organizationPage.isTitleMyOrganizationsDisplayed(), 'My Organizations title should be visible').toBeTruthy();
      console.log('INFO -- Prueba finalizada correctamente')
  });

  test('Test Delete Organization', async ({ page }) => {
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;
    await page.goto(loginUrl!);
    await loginPage.enterEmail(username!);
    await loginPage.enterPassword(password!);
    await loginPage.clickOnLoginButton();
    await loginPage.skipPopUp();
    expect(await homePage.verifyWelcomeLabel()).toBeTruthy();
    await homePage.clickOnOrganizations();
    await homePage.clickOnMyOrganizations();
    await organizationPage.clickOnDeleteAction();
    await organizationPage.clickOnAcceptButton();
    await organizationPage.validatePopUp();
    await organizationPage.validateDelteCard();
    console.log('INFO -- Prueba finalizada correctamente')
  })
  
  test('Test Edit Organization', async ({ page }) => {
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;
    await page.goto(loginUrl!);
    await loginPage.enterEmail(username!);
    await loginPage.enterPassword(password!);
    await loginPage.clickOnLoginButton();
    await loginPage.skipPopUp();
    expect(await homePage.verifyWelcomeLabel()).toBeTruthy();
    await homePage.clickOnOrganizations();
    await homePage.clickOnMyOrganizations();
    await organizationPage.clickOnEditOrganizationCard();
    //Pending for bug solution

  })

  test('Test Add or invite user in organization', async ({page}) =>{
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;
    await page.goto(loginUrl!);
    await loginPage.enterEmail(username!);
    await loginPage.enterPassword(password!);
    await loginPage.clickOnLoginButton();
    await loginPage.skipPopUp();
    expect(await homePage.verifyWelcomeLabel()).toBeTruthy();
    /*await homePage.clickOnOrganizations();
    await homePage.clickOnMyOrganizations();
    await organizationPage.clickOnUsersAction();
    await usersPage.validateViewUsers();
    await usersPage.clickOnInviteUserButton();
    await usersPage.setUserName('testUser');
    await usersPage.setFirtsLastName('Pepito');
    await usersPage.setSecondLastName('Perez');
    await usersPage.setEmail('example@example.com');
    await usersPage.selectRolOption('Administrador');
    await usersPage.clickOnSaveButton();*/
    console.log('INFO -- Prueba finalizada correctamente')
  })

})