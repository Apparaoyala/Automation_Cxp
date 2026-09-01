import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();


export class MailUtil {

    static async sendTestReport(
        results: any[],
        executionDuration: number
    ) {

        const transporter = nodemailer.createTransport({

            host: 'smtp.office365.com',

            port: 587,

            secure: false,

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }

        });


        // ==========================================
        // SUMMARY
        // ==========================================

        const totalTests = results.length;

        const passedTests = results.filter(
            result => result.status === 'passed'
        ).length;

        const failedTests = results.filter(
            result => result.status === 'failed'
        ).length;


        const passPercentage =
            totalTests === 0
                ? '0.0'
                : ((passedTests / totalTests) * 100).toFixed(1);


        // ==========================================
        // TOTAL EXECUTION DURATION
        // ==========================================

        const totalSeconds =
            Math.floor(executionDuration / 1000);

        const hours =
            Math.floor(totalSeconds / 3600);

        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );

        const seconds =
            totalSeconds % 60;


        let formattedDuration = '';


        if (hours > 0) {

            formattedDuration =
                `${hours}h ${minutes}m ${seconds}s`;

        } else {

            formattedDuration =
                `${minutes}m ${seconds}s`;

        }


        // ==========================================
        // EMAIL HEADER
        // ==========================================

        let html = `

        <div style="
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f4f6f8;
            padding: 25px;
        ">

            <div style="
                max-width: 850px;
                margin: auto;
                background-color: white;
                border: 1px solid #ddd;
            ">

                <!-- HEADER -->

                <div style="
                    background-color: #34445c;
                    color: white;
                    padding: 20px;
                ">

                    <h2 style="
                        margin: 0;
                    ">
                        Automation Execution Report
                    </h2>

                    <p style="
                        margin: 5px 0 0 0;
                    ">
                        Playwright Automation
                    </p>

                </div>


                <!-- SUMMARY -->

                <div style="
                    padding: 20px;
                ">

                    <h3>
                        Test Summary
                    </h3>


                    <table
                        width="100%"
                        cellpadding="8"
                        cellspacing="5"
                        style="
                            text-align: center;
                        "
                    >

                        <tr>

                            <td style="
                                border: 1px solid #ddd;
                                background: #f8f9fa;
                            ">

                                <b>Total Tests</b>

                                <br>

                                <span style="
                                    font-size: 22px;
                                ">
                                    ${totalTests}
                                </span>

                            </td>


                            <td style="
                                border: 1px solid #ddd;
                                background: #f8fff8;
                            ">

                                <b>Passed</b>

                                <br>

                                <span style="
                                    font-size: 22px;
                                ">
                                    ${passedTests}
                                </span>

                            </td>


                            <td style="
                                border: 1px solid #ddd;
                                background: #fff7f7;
                            ">

                                <b>Failed</b>

                                <br>

                                <span style="
                                    font-size: 22px;
                                ">
                                    ${failedTests}
                                </span>

                            </td>


                            <td style="
                                border: 1px solid #ddd;
                                background: #f8f9fa;
                            ">

                                <b>Pass Rate</b>

                                <br>

                                <span style="
                                    font-size: 22px;
                                ">
                                    ${passPercentage}%
                                </span>

                            </td>


                            <td style="
                                border: 1px solid #ddd;
                                background: #f8f9fa;
                            ">

                                <b>Duration</b>

                                <br>

                                <span style="
                                    font-size: 18px;
                                ">
                                    ${formattedDuration}
                                </span>

                            </td>

                        </tr>

                    </table>


                    <!-- TEST RESULTS -->

                    <h3 style="
                        margin-top: 25px;
                    ">
                        Test Results
                    </h3>

        `;


        // ==========================================
        // EACH TEST
        // ==========================================

        for (const result of results) {

            const isPassed =
                result.status === 'passed';


            const statusText =
                isPassed
                    ? 'PASS'
                    : 'FAIL';


            const icon =
                isPassed
                    ? '✓'
                    : '✗';


            // --------------------------------------
            // PASSED TEST
            // --------------------------------------

            if (isPassed) {

                html += `

                    <div style="
                        border: 1px solid #ddd;
                        padding: 12px;
                        margin-bottom: 10px;
                        background-color: #ffffff;
                    ">

                        <table width="100%">

                            <tr>

                                <td>

                                    <span style="
                                        font-size: 18px;
                                    ">
                                        ${icon}
                                    </span>

                                    <b>
                                        ${result.testName}
                                    </b>

                                </td>


                                <td style="
                                    text-align: right;
                                ">

                                    <b>
                                        ${statusText}
                                    </b>

                                </td>

                            </tr>

                        </table>

                    </div>

                `;

            }


            // --------------------------------------
            // FAILED TEST
            // --------------------------------------

            else {

                const failedSteps =
                    result.steps.filter(
                        (step: any) =>
                            step.status === 'failed'
                    );


                html += `

                    <div style="
                        border: 1px solid #ddd;
                        padding: 12px;
                        margin-bottom: 10px;
                        background-color: #ffffff;
                    ">

                        <table width="100%">

                            <tr>

                                <td>

                                    <span style="
                                        font-size: 18px;
                                    ">
                                        ✗
                                    </span>

                                    <b>
                                        ${result.testName}
                                    </b>

                                </td>


                                <td style="
                                    text-align: right;
                                ">

                                    <b>
                                        FAIL
                                    </b>

                                </td>

                            </tr>

                        </table>


                        <p style="
                            margin-bottom: 5px;
                        ">

                            <b>
                                Failed Steps:
                            </b>

                        </p>


                        <ul style="
                            margin-top: 5px;
                        ">

                `;


                // Show ONLY failed steps

                if (failedSteps.length > 0) {

                    for (const step of failedSteps) {

                        html += `

                            <li style="
                                margin-bottom: 5px;
                            ">

                                ✗
                                ${step.name}

                            </li>

                        `;

                    }

                } else {

                    html += `

                        <li>
                            Test failed.
                            Failed step details are
                            available in Allure.
                        </li>

                    `;

                }


                html += `

                        </ul>

                    </div>

                `;

            }

        }


        // ==========================================
        // ALLURE LINK
        // ==========================================

        const allureUrl =
            process.env.ALLURE_REPORT_URL;


        if (allureUrl) {

            html += `

                <div style="
                    text-align: center;
                    padding: 25px;
                    border-top: 1px solid #ddd;
                ">

                    <a
                        href="${allureUrl}"
                        style="
                            display: inline-block;
                            background-color: #2f6fed;
                            color: white;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 4px;
                            font-weight: bold;
                        "
                    >
                        View Allure Report
                    </a>

                    <p style="
                        font-size: 12px;
                        color: #777;
                    ">
                        Open Allure Report for complete
                        execution details.
                    </p>

                </div>

            `;

        }


        // ==========================================
        // CLOSE HTML
        // ==========================================

        html += `

                </div>

            </div>

        </div>

        `;


        // ==========================================
        // SEND EMAIL
        // ==========================================

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_TO,

            subject:
                failedTests > 0
                    ? 'Playwright Automation - FAILED'
                    : 'Playwright Automation - PASSED',

            html: html

        });


        console.log(
            'Mail Sent Successfully'
        );
    }
}