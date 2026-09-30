import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { calculateWorkflowCost } from '../utils/cost-calculator';

export function costAnalysis(filePath: string, monthlyExecutions: number): void {
  try {
    // Validate monthly executions
    if (monthlyExecutions <= 0) {
      console.error(chalk.red(`\n❌ Monthly execution count must be greater than 0\n`));
      process.exit(1);
    }

    // Load workflow
    const resolvedPath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(resolvedPath)) {
      console.error(chalk.red(`\n❌ File not found: ${filePath}\n`));
      process.exit(1);
    }

    const raw = fs.readFileSync(resolvedPath, 'utf8');
    let workflow: any;

    try {
      workflow = JSON.parse(raw);
    } catch (parseError: any) {
      console.error(chalk.red(`\n❌ JSON Parse Error: ${parseError.message}\n`));
      process.exit(1);
    }

    // Calculate costs
    const costBreakdown = calculateWorkflowCost(workflow, monthlyExecutions);

    // Display report
    console.log(chalk.bold(`\n💰 Workflow Cost Analysis\n`));
    console.log(`File: ${chalk.cyan(filePath)}`);
    console.log(`Monthly Executions: ${chalk.cyan(monthlyExecutions.toLocaleString())}\n`);

    console.log(chalk.cyan.bold('Cost Breakdown:'));
    console.log(`  • API Calls: $${costBreakdown.apiCost.toFixed(4)}`);
    console.log(`  • Compute: $${costBreakdown.computeCost.toFixed(4)}`);
    console.log(`  • Storage: $${costBreakdown.storageCost.toFixed(4)}`);
    console.log(`  ${'─'.repeat(40)}`);
    console.log(`  • Monthly Total: ${chalk.bold('$' + costBreakdown.totalMonthlyCost.toFixed(4))}`);
    console.log(`  • Annual Total: ${chalk.bold('$' + (costBreakdown.totalMonthlyCost * 12).toFixed(2))}\n`);

    console.log(chalk.cyan.bold('Optimization Suggestions:'));
    costBreakdown.optimizationSuggestions.forEach((suggestion, idx) => {
      console.log(`  ${idx + 1}. ${suggestion}`);
    });

    console.log('');

  } catch (error: any) {
    console.error(chalk.red(`\n❌ Error: ${error.message}\n`));
    process.exit(1);
  }
}
