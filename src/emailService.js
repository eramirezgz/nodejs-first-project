import nodemailer from 'nodemailer';

class emailService {
    #user = 'eramirezgz70@gmail.com'
    #pass = 'ipnz gvzh xord bpay'
    
    constructor() {
        this.transporter = nodemailer.createTransport( {
            service: "gmail",
            auth: {
                user: this.#user,
                pass: this.#pass
            }
        });
    }

    async sendEmail(Data) {
        await this.transporter.sendMail({
            from: this.#user,
            to: Data.email,
            subject: Data.subject,
            text: Data.message
    });
  }
}

export default emailService;