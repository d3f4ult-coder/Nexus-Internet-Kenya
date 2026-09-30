#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import dotenv from 'dotenv';

import { validateWorkflow } from './commands/validate-workflow';
import { checkApiLimits } from './commands/check-api-limits';
import { simulateWebhook } from './commands/simulate-webhook';
import { testRetryLogic } from './commands/test-retry-logic';
import { costAnalysis } from './commands/cost-analysis';
import { healthCheck } from './commands/health-check';

dotenv.config();

const program = new Command();

program
  .name('autom8')
  .description(chalk.cyan('Automation engineering toolkit for workflow validation, rate limits, retries, and cost analysis'))
  .version('0.1.0');

program
  .command('validate-workflow')
  .description('Validate workflow JSON for reliability and operational issues')
  .requiredOption('-f, --file <path>', 'JSON workflow file path')
  .action((options) => {
    validateWorkflow(options.file);
  });

program
  .command('check-api-limits')
  .description('Show rate limits and quota info for a supported API')
  .requiredOption('-a, --api <name>', 'API name (hubspot, slack, gcpBigQuery, airtable, salesforce, awsS3, twillio, stripe)')
  .action((options) => {
    checkApiLimits(options.api);
  });

program
  .command('simulate-webhook')
  .description('Simulate a webhook payload through validation and field mapping rules')
  .requiredOption('-f, --file <path>', 'Webhook JSON or template file')
  .option('-m, --mapping <path>', 'Optional field mapping JSON file')
  .action((options) => {
    simulateWebhook(options.file, options.mapping);
  });

program
  .command('test-retry-logic')
  .description('Simulate retry behavior for exponential backoff policies')
  .requiredOption('--strategy <strategy>', 'Retry strategy: exponential or linear')
  .requiredOption('--base <ms>', 'Base delay in milliseconds')
  .requiredOption('--max-attempts <count>', 'Maximum number of attempts')
  .option('--jitter', 'Use jitter in retry calculations', false)
  .action((options) => {
    testRetryLogic({
      strategy: options.strategy,
      baseDelayMs: Number(options.base),
      maxAttempts: Number(options.maxAttempts),
      jitter: options.jitter,
    });
  });

program
  .command('cost-analysis')
  .description('Estimate workflow cost and highlight optimization opportunities')
  .requiredOption('-f, --file <path>', 'Workflow JSON file')
  .requiredOption('-c, --count <number>', 'Monthly execution count')
  .action((options) => {
    costAnalysis(options.file, Number(options.count));
  });

program
  .command('health-check')
  .description('Check API connectivity and auth using environment credentials')
  .requiredOption('-a, --api <name>', 'API provider name')
  .action((options) => {
    healthCheck(options.api);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log(chalk.yellow('\n⚠️  No command provided. Run `autom8 --help` for usage.\n'));
  program.help();
}
