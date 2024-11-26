import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { OrganizationPage } from '../pages/Organizations/OrganizationPage'
import { ProjectsPage } from '../pages/Organizations/ProjectsPage'
import { UsersPage } from '../pages/Organizations/UsersPage'

test.describe('Project Testing', () => {

    let loginPage: LoginPage;
    let homePage: HomePage;
    let organizationPage: OrganizationPage;
    let usersPage: UsersPage;
    let projectPage: ProjectsPage;
    const loginUrl = process.env.URL;
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        organizationPage = new OrganizationPage(page);
        usersPage = new UsersPage(page);
        projectPage = new ProjectsPage(page);
    });

    test('Create a project', async ({ page }) => {
        await page.goto(loginUrl!);
        await loginPage.enterEmail(username!);
        await loginPage.enterPassword(password!);
        await loginPage.clickOnLoginButton();
        await loginPage.skipPopUp();
        expect(await homePage.verifyWelcomeLabel()).toBeTruthy();
        await homePage.clickOnOrganizations();
        await homePage.clickOnMyOrganizations();
        await organizationPage.clickOnProject();
        expect(await projectPage.isTitleProjectDisplayed()).toBeTruthy();
        await projectPage.clickOnCreateProject()
        expect(await projectPage.isSubtitleProjectDisplayed()).toBeTruthy();
        await projectPage.setProjectName('Testting');
        await projectPage.clickOnSaveButton();
        await projectPage.checkPopUpMessage();
    })

    test('Add or invite user in Project', async ({ page }) => {
        await page.goto(loginUrl!);
        await loginPage.enterEmail(username!);
        await loginPage.enterPassword(password!);
        await loginPage.clickOnLoginButton();
        await loginPage.skipPopUp();
        expect(await homePage.verifyWelcomeLabel()).toBeTruthy();
        await homePage.clickOnOrganizations();
        await homePage.clickOnMyOrganizations();
        await organizationPage.clickOnProject();
        expect(await projectPage.isTitleProjectDisplayed()).toBeTruthy();
        await projectPage.clickOnUsersAction();
        await usersPage.validateViewUsers();
        await usersPage.clickOnAddUserButton();
        await usersPage.selectUser(1);
        await usersPage.selectRolList(1);
        await usersPage.clickOnSaveButton();
        await usersPage.validatePopUp();
    })
})