import { MailUtil } from './MailUtil';

async function globalTeardown() {

    console.log("===== GLOBAL TEARDOWN STARTED =====");

    await MailUtil.sendTestMail();

    console.log("===== MAIL SENT FROM GLOBAL TEARDOWN =====");
}

export default globalTeardown;