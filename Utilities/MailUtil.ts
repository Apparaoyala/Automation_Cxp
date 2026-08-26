import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

export class MailUtil {

    static async sendTestReport(results: any[]) {

        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const totalTests = results.length;

        const passedTests = results.filter(
            result => result.status === 'passed'
        ).length;

        const failedTests = results.filter(
            result => result.status === 'failed'
        ).length;

        let html = `
            <h2>Playwright Automation Test Report</h2>

            <p>
                <b>Total Tests:</b> ${totalTests}<br>
                <b>Passed:</b> ${passedTests}<br>
                <b>Failed:</b> ${failedTests}
            </p>

            <hr>
        `;

        for (const result of results) {

            const status =
                result.status === 'passed'
                    ? 'PASS'
                    : 'FAIL';

            html += `
                <h3>${result.testName} - ${status}</h3>

                <p>
                    <b>Spec:</b> ${result.file}<br>
                    <b>Duration:</b> ${result.duration} ms
                </p>

                <h4>Steps</h4>

                <ul>
            `;

            for (const step of result.steps) {

                const icon =
                    step.status === 'passed'
                        ? '✓'
                        : '✗';

                html += `
                    <li>
                        ${icon} ${step.name} -
                        ${step.status.toUpperCase()}
                    </li>
                `;
            }

            html += `
                </ul>
                <hr>
            `;
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject:
                failedTests > 0
                    ? 'Playwright Automation - FAILED'
                    : 'Playwright Automation - PASSED',
            html: html
        });

        console.log('Mail Sent Successfully');
    }
}