import * as dotenv from 'dotenv';

dotenv.config();
    

const configNumber = process.env.ACTIVE_CONFIG || '2';

export class TestConfig {

     appUrl =
        process.env[`APP_URL_${configNumber}`]!;

     Caterid =
        process.env[`CATER_ID_${configNumber}`]!;

     UserId =
        process.env[`USER_ID_${configNumber}`]!;

     password =
        process.env[`PASSWORD_${configNumber}`]!;
}