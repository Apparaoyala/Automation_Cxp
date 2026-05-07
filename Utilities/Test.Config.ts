import dotenv from 'dotenv';

dotenv.config();

export class TestConfig {

    appUrl = process.env.APP_URL!;
    Caterid = process.env.CATER_ID!;
    UserId = process.env.USER_ID!;
    password = process.env.PASSWORD!;
}