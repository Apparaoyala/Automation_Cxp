
import {
    Reporter,
    TestCase,
    TestResult
} from '@playwright/test/reporter';

import fs from 'fs';
import path from 'path';

import { MailUtil } from './MailUtil';


export default class TestReporter implements Reporter {

    private results: any[] = [];

    // Store complete execution start time
    private executionStartTime: number = Date.now();


    onTestEnd(test: TestCase, result: TestResult) {

        const steps = result.steps

            // Remove framework/internal steps
            .filter(step =>
                step.title !== 'Before Hooks' &&
                step.title !== 'After Hooks' &&
                step.title !== 'Worker Cleanup'
            )

            // Remove individual Fill actions
            .filter(step =>
                !step.title.startsWith('Fill "')
            )

            // Remove individual Click actions
            .filter(step =>
                !step.title.startsWith('Click ')
            )

            // Convert Playwright steps to our format
            .map(step => ({

                name: step.title,

                status: step.error
                    ? 'failed'
                    : 'passed'

            }));


        // Store test result
        this.results.push({

            file: test.location.file,

            testName: test.title,

            status: result.status,

            duration: result.duration,

            steps: steps

        });
    }


    async onEnd() {

        // Calculate total execution duration
        const executionDuration =
            Date.now() - this.executionStartTime;


        // JSON file location
        const filePath = path.join(
            process.cwd(),
            'test-results',
            'automation-results.json'
        );


        // Create test-results folder if required
        fs.mkdirSync(
            path.dirname(filePath),
            {
                recursive: true
            }
        );


        // Save results
        fs.writeFileSync(
            filePath,
            JSON.stringify(
                {
                    executionDuration,
                    results: this.results
                },
                null,
                2
            )
        );


        console.log(
            '===== TEST RESULTS SAVED ====='
        );


        console.log(
            `===== TOTAL TESTS: ${this.results.length} =====`
        );


        // Send ONE email after ALL tests finish
        await MailUtil.sendTestReport(
            this.results,
            executionDuration
        );


        console.log(
            '===== FINAL TEST MAIL SENT ====='
        );
    }
}