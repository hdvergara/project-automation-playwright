import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private lblTitlePopUp: Locator;
  private lnkOmitir: Locator;
  private lblLoginError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#next');
    this.lblTitlePopUp = page.locator('//span[contains(text(),"Conoce un poco más sobre")]');
    this.lnkOmitir = page.locator('//a[contains(text(),"Omitir")]');
    this.lblLoginError = page.locator('//*[@class="error pageLevel"]');
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  async clickOnLoginButton() {
    await this.loginButton.click()
  }

  async skipPopUp() {
    try {
      await this.page.waitForSelector('//span[contains(text(),"¡Bienvenid@!")]', { timeout: 60000 });
      if(await this.lblTitlePopUp.isVisible()){
        await this.lnkOmitir.click();
      }  
    } catch (e) {
      console.log('El popup de bienvenida no apareció.');
    }
  
  }

  async showLblLoginError(){
    await this.lblLoginError.waitFor({ state: "visible", timeout: 30000 });
    return await this.lblLoginError.isVisible();
  }

}