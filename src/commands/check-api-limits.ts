import chalk from 'chalk';
import { loadApiSpecs } from '../utils/load-api-specs';

export function checkApiLimits(apiName: string): void {
  try {
    const specs = loadApiSpecs();
    const normalized = apiName.toLowerCase();

    const api = specs.apis[normalized];

    if (!api) {
      console.error(chalk.red(`\n❌ Unsupported API: ${apiName}\n`));
      console.log(chalk.yellow('Supported APIs:'));
      Object.keys(specs.apis).forEach(key => {
        console.log(`  • ${key}`);
      });
      console.log('');
      process.exit(1);
    }

    // Display header
    console.log(chalk.bold(`\n📊 ${api.name} Rate Limits & Quotas\n`));

    // Rate limits
    console.log(chalk.cyan.bold('Rate Limits:'));
    Object.entries(api.rateLimit).forEach(([key, value]) => {
      const formattedKey = key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1);
      console.log(`  • ${formattedKey}: ${value}`);
    });

    // Recommended batch size
    console.log(`\n${chalk.cyan.bold('Recommended Batch Size:')}`);
    console.log(`  • ${api.recommendedBatchSize} records`);

    // Cost model
    if (api.costModel) {
      console.log(`\n${chalk.cyan.bold('Cost Model:')}`);
      console.log(`  • ${api.costModel}`);
    }

    // Documentation link
    console.log(`\n${chalk.cyan.bold('Documentation:')}`);
    console.log(`  ${chalk.underline(api.documentation)}`);

    console.log('');

  } catch (error: any) {
    console.error(chalk.red(`\n❌ Error: ${error.message}\n`));
    process.exit(1);
  }
}
