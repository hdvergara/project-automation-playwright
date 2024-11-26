import { type Locator, type Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MailSlurpClient } from '../utils/MailSlurpClient';

export class RegisterPage {
    private page: Page;
    private mailSlurpClient: MailSlurpClient;
    private registerButton: Locator;
    private emailInput: Locator;
    private emailVerificationControButton: Locator;
    private verificationCodeInput: Locator;
    private verifyCodeButton: Locator;
    private lblEmailVerificationSuccess: Locator;
    private nameInput: Locator;
    private lastNameInput: Locator;
    private passwordInput: Locator;
    private reenterPasswordInput: Locator;
    private continueButton: Locator;
    private titleTerms: Locator;
    private textBoxTerm: Locator;
    private downloadTermAndConditions: Locator;
    private checkBoxAgreeTerms: Locator;
    private lblOrganizationRegister: Locator;
    private organizationName: Locator;
    private organizationAddress: Locator;
    private organizationCountry: Locator;
    private organizationState: Locator;
    private organizationCity: Locator;
    private organizationPostalCode: Locator;
    private organizationPhone: Locator;
    private loader: Locator;

    constructor(page: Page, mailSlurpClient: MailSlurpClient) {
        this.page = page;
        this.mailSlurpClient = mailSlurpClient;
        this.registerButton = page.locator('#createAccount');
        this.emailInput = page.locator('#email');
        this.emailVerificationControButton = page.locator('#emailVerificationControl_but_send_code');
        this.verificationCodeInput = page.locator('#VerificationCode');
        this.verifyCodeButton = page.locator('.verifyCode');
        this.lblEmailVerificationSuccess = page.locator('#emailVerificationControl_success_message');
        this.nameInput = page.locator('#givenName');
        this.lastNameInput = page.locator('#surname');
        this.passwordInput = page.locator('#password');
        this.reenterPasswordInput = page.locator('#reenterPassword');
        this.continueButton = page.locator('#continue');
        this.titleTerms = page.locator('//h1[@class="titleTyC"]');
        this.textBoxTerm = page.locator('//section[@class="informationTyC"]');
        this.downloadTermAndConditions = page.locator('//div[@class="downloadTyC"]');
        this.checkBoxAgreeTerms = page.locator('#AgreeToTermsOfUseConsentYes_V2_option');
        this.lblOrganizationRegister = page.locator('//div[@class="logoCenterRegistre"]/span');
        this.organizationName = page.locator('#organizationName');
        this.organizationAddress = page.locator('#organizationAddress');
        this.organizationCountry = page.locator('#organizationCountry');
        this.organizationState = page.locator('#organizationState');
        this.organizationCity = page.locator('#organizationCity');
        this.organizationPostalCode = page.locator('#organizationPostalCode');
        this.organizationPhone = page.locator('#organizationPhone');
        this.loader = page.locator('//div[@class="loader"]');
    }
    /**
     * 
     * @param password 
     */
    async register(password: string) {
        await this.registerButton.click();
        const inbox = await this.mailSlurpClient.createInbox();
        const email = inbox.emailAddress;
        await this.emailInput.fill(email);
        await this.emailVerificationControButton.click();
        const emailMessage = await this.mailSlurpClient.waitForEmail(inbox.id);
        const emailBody: string = emailMessage.body ?? '';
        const code = this.mailSlurpClient.extractCode(emailBody);
        await this.verificationCodeInput.fill(code);
        await this.verifyCodeButton.click();
        expect(this.lblEmailVerificationSuccess).toBeTruthy();
        await this.nameInput.fill(faker.person.firstName());
        await this.lastNameInput.fill(faker.person.lastName());
        await this.passwordInput.fill(password);
        await this.reenterPasswordInput.fill(password);
        await this.continueButton.click();
        await this.titleTerms.waitFor({ state: "visible", timeout: 50000 })
        expect(this.titleTerms, 'Terms & Conditions title should be visible').toBeVisible();
        expect(this.textBoxTerm).toBeVisible();
        expect(this.downloadTermAndConditions, 'Download Terms & Conditions button should be visible').toBeVisible();
        await this.checkBoxAgreeTerms.click();
        await this.continueButton.click();
        await this.mailSlurpClient.deleteInbox(inbox.id)
    }

    async checkOrganizationRegisterLabel(){
        expect(this.lblOrganizationRegister).toBeTruthy();
    }

    async setOrganizationName(){
        await this.organizationName.fill(faker.company.name());
    }

    async setOrganizationAddress(){
        await this.organizationAddress.fill(faker.location.streetAddress());
    }

    async setCountry(country: string){
        await this.organizationCountry.selectOption(country);
    }


    async setState(orgState: string){
        await this.organizationState.fill(orgState);
    }

    async setCity(orgCity: string){
        await this.organizationCity.fill(orgCity);
    }

    async setPostalCode(orgZipCode: string){
        await this.organizationPostalCode.fill(orgZipCode);
    }

    async setPhone(orgPhone: string){
        await this.organizationPhone.fill(orgPhone);
    }

    async organizationRegister(country: string, orgState: string, orgCity: string, orgZipCode: string, orgPhone: string) {
        expect(this.lblOrganizationRegister).toBeTruthy();
        await this.organizationName.fill(faker.company.name());
        await this.organizationAddress.fill(faker.location.streetAddress());
        await this.organizationCountry.selectOption(country);
        await this.organizationState.fill(orgState);
        await this.organizationCity.fill(orgCity);
        await this.organizationPostalCode.fill(orgZipCode);
        await this.organizationPhone.fill(orgPhone);
        await this.continueButton.click();
    }

} 