import { MailAdapter, SendMailData } from "../MailAdapter";

import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "806940c5921af3",
        pass: "0fdf708dff7707"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@fidget.com>',
            to: 'João Victor Sodré <joaov1070@gmail.com>',
            subject,
            html: body,
        });
    }
}