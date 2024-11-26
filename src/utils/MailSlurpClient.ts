import { MailSlurp } from "mailslurp-client";

interface Inbox {
    id: string;
    emailAddress: string;
  }
  
export class MailSlurpClient {
  private mailslurp: MailSlurp;

  constructor(apiKey: string | undefined) {
    if (apiKey) {
      this.mailslurp = new MailSlurp({ apiKey });
    } else {
      throw new Error("Missing API Key");
    }
  }

  async createInbox(): Promise<Inbox> {
    const inbox = await this.mailslurp.createInbox();
    return inbox;

  }

  async waitForEmail(inboxId: string, timeout = 30000) {
    const email = await this.mailslurp.waitForLatestEmail(inboxId, timeout);
    return email;
  }

  extractCode(emailBody: string) {
    const match = emailBody.match(/<p class="codeUser">\s*(\d{6})\s*<\/p>/);

    if (match && match[1]) {
        const extractedCode = match[1].trim(); // Eliminamos espacios en blanco adicionales
        if (extractedCode.length === 0) {
            throw new Error('El código extraído está vacío.');
        }
        return extractedCode;
    } else {
        throw new Error('No se encontró el código en el cuerpo del email.');
    }
  }

  async deleteInbox(inboxId: string) {
    await this.mailslurp.deleteInbox(inboxId);
    console.log(`Inbox con ID ${inboxId} ha sido eliminado.`);
  }
}
