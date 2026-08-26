import { MailUtil } from './MailUtil';

async function testMail() {

    console.log('===== TEST MAIL STARTED =====');

    const results = [
        {
            file: 'Tests/Login.spec.ts',
            testName: 'authenticate',
            status: 'passed',
            duration: 65000,
            steps: [
                {
                    name: 'Navigate to "/"',
                    status: 'passed'
                },
                {
                    name: 'Login into Application',
                    status: 'passed'
                },
                {
                    name: 'WarehouseService',
                    status: 'passed'
                }
            ]
        }
    ];

    await MailUtil.sendTestReport(results);

    console.log('===== TEST MAIL COMPLETED =====');
}

testMail();