import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export function simulateWebhook(filePath: string, mappingPath?: string): void {
  try {
    // Load payload
    const resolvedPayloadPath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(resolvedPayloadPath)) {
      console.error(chalk.red(`\n❌ Webhook file not found: ${filePath}\n`));
      process.exit(1);
    }

    const payloadRaw = fs.readFileSync(resolvedPayloadPath, 'utf8');
    const payload = JSON.parse(payloadRaw);

    // Load or use default mapping
    let mapping: Record<string, string> = {
      id: 'id',
      email: 'email',
      name: 'name'
    };

    if (mappingPath) {
      const resolvedMappingPath = path.resolve(process.cwd(), mappingPath);
      if (!fs.existsSync(resolvedMappingPath)) {
        console.error(chalk.red(`\n❌ Mapping file not found: ${mappingPath}\n`));
        process.exit(1);
      }
      const mappingRaw = fs.readFileSync(resolvedMappingPath, 'utf8');
      mapping = JSON.parse(mappingRaw);
    }

    // Apply mapping
    const transformed: Record<string, any> = {};

    for (const [target, source] of Object.entries(mapping)) {
      const value = (source as string)
        .split('.')
        .reduce((acc: any, key: string) => acc?.[key], payload);

      transformed[target] = value !== undefined ? value : null;
    }

    // Display simulation results
    console.log(chalk.bold(`\n🔗 Webhook Simulation\n`));

    console.log(chalk.cyan.bold('Incoming Payload:'));
    console.log(JSON.stringify(payload, null, 2));

    console.log(`\n${chalk.cyan.bold('Field Mapping:')}`); 
    Object.entries(mapping).forEach(([target, source]) => {
      console.log(`  • ${target} → ${source}`);
    });

    console.log(`\n${chalk.cyan.bold('Transformed Payload (Downstream):')}`); 
    console.log(JSON.stringify(transformed, null, 2));

    // Validation summary
    console.log(`\n${chalk.cyan.bold('Validation Summary:')}`); 
    console.log(`  ✓ Payload parsed successfully`);
    console.log(`  ✓ Field mapping applied`);
    const missingFields = Object.entries(transformed).filter(([_, v]) => v === null);
    if (missingFields.length > 0) {
      console.log(chalk.yellow(`  ⚠ ${missingFields.length} field(s) missing: ${missingFields.map(([k]) => k).join(', ')}`);
    } else {
      console.log(`  ✓ All mapped fields present`);
    }

    console.log('');

  } catch (error: any) {
    console.error(chalk.red(`\n❌ Webhook simulation failed: ${error.message}\n`));
    process.exit(1);
  }
}
