import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export class MailUtil {

    static async sendTestMail() {

        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: 'Playwright Mail Test',
            text: 'Mail configuration is working successfully.'
        });

        console.log('Mail Sent Successfully');
    }
}