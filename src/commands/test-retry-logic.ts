import chalk from 'chalk';
import { RetryConfig } from '../utils/types';

export function testRetryLogic(config: RetryConfig): void {
  try {
    const { strategy, baseDelayMs, maxAttempts, jitter } = config;

    // Validate inputs
    if (!['exponential', 'linear'].includes(strategy)) {
      console.error(chalk.red(`\n❌ Invalid strategy: ${strategy}. Use 'exponential' or 'linear'\n`));
      process.exit(1);
    }

    if (baseDelayMs <= 0) {
      console.error(chalk.red(`\n❌ Base delay must be greater than 0\n`));
      process.exit(1);
    }

    if (maxAttempts <= 0) {
      console.error(chalk.red(`\n❌ Max attempts must be greater than 0\n`));
      process.exit(1);
    }

    // Simulate retries
    let cumulative = 0;
    const delays: Array<{ attempt: number; delayMs: number; cumulativeMs: number; successProbability: number }> = [];

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      let delay = strategy === 'exponential'
        ? baseDelayMs * Math.pow(2, attempt - 1)
        : baseDelayMs * attempt;

      if (jitter) {
        const jitterAmount = Math.floor(Math.random() * (delay / 2));
        delay = Math.max(0, delay + jitterAmount);
      }

      cumulative += delay;

      const successProbability = Math.max(0, 1 - (attempt / (maxAttempts + 1)));

      delays.push({
        attempt,
        delayMs: delay,
        cumulativeMs: cumulative,
        successProbability
      });
    }

    // Display simulation
    console.log(chalk.bold(`\n⏱️  Retry Logic Simulation\n`));

    console.log(chalk.cyan.bold('Configuration:'));
    console.log(`  • Strategy: ${strategy}`);
    console.log(`  • Base delay: ${baseDelayMs}ms`);
    console.log(`  • Max attempts: ${maxAttempts}`);
    console.log(`  • Jitter: ${jitter ? '✓ Enabled' : '✗ Disabled'}\n`);

    console.log(chalk.cyan.bold('Retry Schedule:'));
    console.log(chalk.dim('Attempt | Delay (ms) | Cumulative (ms) | Success Prob'));
    console.log(chalk.dim('--------|------------|-----------------|----------'));

    delays.forEach((item) => {
      const attemptStr = String(item.attempt).padEnd(7);
      const delayStr = String(item.delayMs).padEnd(10);
      const cumulativeStr = String(item.cumulativeMs).padEnd(15);
      const probStr = (item.successProbability * 100).toFixed(0) + '%';

      console.log(`${attemptStr}| ${delayStr} | ${cumulativeStr}| ${probStr}`);
    });

    const totalTime = delays[delays.length - 1]?.cumulativeMs ?? 0;
    const totalSeconds = (totalTime / 1000).toFixed(2);

    console.log(`\n${chalk.cyan.bold('Summary:')}`); 
    console.log(`  • Total time to exhaustion: ${totalTime}ms (${totalSeconds}s)`);
    console.log(`  • Estimated success rate after all attempts: ${(delays[delays.length - 1]?.successProbability * 100).toFixed(1)}%`);

    console.log('');

  } catch (error: any) {
    console.error(chalk.red(`\n❌ Error: ${error.message}\n`));
    process.exit(1);
  }
}
