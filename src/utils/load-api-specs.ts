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
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to load API specs: ${message}`);
  }
}
