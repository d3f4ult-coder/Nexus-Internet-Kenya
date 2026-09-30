import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { validateWorkflowStructure, calculateWorkflowScore } from '../utils/validation';

export function validateWorkflow(filePath: string): void {
  try {
    // Resolve file path
    const resolvedPath = path.resolve(process.cwd(), filePath);

    // Check if file exists
    if (!fs.existsSync(resolvedPath)) {
      console.error(chalk.red(`\n❌ Error: File not found: ${filePath}\n`));
      process.exit(1);
    }

    // Read and parse workflow
    const raw = fs.readFileSync(resolvedPath, 'utf8');
    let workflow: any;

    try {
      workflow = JSON.parse(raw);
    } catch (parseError: any) {
      console.error(chalk.red(`\n❌ JSON Parse Error: ${parseError.message}\n`));
      process.exit(1);
    }

    // Validate workflow
    const issues = validateWorkflowStructure(workflow);
    const score = calculateWorkflowScore(issues);
    const isValid = score >= 70;

    // Display report header
    console.log(chalk.bold(`\n📋 Workflow Validation Report\n`));
    console.log(`File: ${chalk.cyan(filePath)}`);
    console.log(`Score: ${chalk.bold(score + '/100')}`);
    console.log(`Status: ${isValid ? chalk.green('✅ Passed') : chalk.red('❌ Failed')}\n`);

    // Display issues grouped by severity
    if (issues.length === 0) {
      console.log(chalk.green('✓ No issues found. Workflow looks operationally healthy!\n'));
      return;
    }

    const highSeverity = issues.filter(i => i.severity === 'high');
    const mediumSeverity = issues.filter(i => i.severity === 'medium');
    const lowSeverity = issues.filter(i => i.severity === 'low');

    if (highSeverity.length > 0) {
      console.log(chalk.red.bold('🔴 Critical Issues:'));
      highSeverity.forEach((issue, idx) => {
        console.log(`  ${idx + 1}. ${issue.message}`);
        if (issue.suggestion) {
          console.log(`     💡 Suggestion: ${issue.suggestion}`);
        }
      });
      console.log('');
    }

    if (mediumSeverity.length > 0) {
      console.log(chalk.yellow.bold('🟡 Warnings:'));
      mediumSeverity.forEach((issue, idx) => {
        console.log(`  ${idx + 1}. ${issue.message}`);
        if (issue.suggestion) {
          console.log(`     💡 Suggestion: ${issue.suggestion}`);
        }
      });
      console.log('');
    }

    if (lowSeverity.length > 0) {
      console.log(chalk.blue.bold('🔵 Info:'));
      lowSeverity.forEach((issue, idx) => {
        console.log(`  ${idx + 1}. ${issue.message}`);
        if (issue.suggestion) {
          console.log(`     💡 Suggestion: ${issue.suggestion}`);
        }
      });
      console.log('');
    }

    console.log(chalk.dim('Run with -v flag for detailed output'));
    console.log('');

  } catch (error: any) {
    console.error(chalk.red(`\n❌ Unexpected error: ${error.message}\n`));
    process.exit(1);
  }
}
