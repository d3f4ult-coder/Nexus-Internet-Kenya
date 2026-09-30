import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { ApiSpecs } from './types';

export function loadApiSpecs(): ApiSpecs {
  try {
    const configPath = path.resolve(__dirname, '../../config/api-specs.json');
    const raw = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(raw) as ApiSpecs;
  } catch (error: any) {
    console.error(chalk.red(`Failed to load API specs: ${error.message}`));
    process.exit(1);
  }
}
