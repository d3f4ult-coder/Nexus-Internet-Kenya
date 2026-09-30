import chalk from 'chalk';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_ENDPOINTS: Record<string, string> = {
  hubspot: 'https://api.hubapi.com/crm/v3/objects/contacts',
  slack: 'https://slack.com/api/auth.test',
  salesforce: 'https://login.salesforce.com/services/oauth2/token',
  airtable: 'https://api.airtable.com/v0/meta/bases',
  awsS3: 'https://s3.amazonaws.com/',
  twillio: 'https://api.twilio.com/2010-04-01/Accounts',
  stripe: 'https://api.stripe.com/v1/balance',
  gcpBigQuery: 'https://bigquery.googleapis.com/bigquery/v2/projects'
};

const TOKEN_ENV_MAP: Record<string, string> = {
  hubspot: 'HUBSPOT_TOKEN',
  slack: 'SLACK_TOKEN',
  salesforce: 'SALESFORCE_TOKEN',
  airtable: 'AIRTABLE_TOKEN',
  awsS3: 'AWS_ACCESS_KEY_ID',
  twillio: 'TWILIO_ACCOUNT_SID',
  stripe: 'STRIPE_API_KEY',
  gcpBigQuery: 'GOOGLE_APPLICATION_CREDENTIALS'
};

export async function healthCheck(apiName: string): Promise<void> {
  try {
    const normalized = apiName.toLowerCase();
    const tokenEnv = TOKEN_ENV_MAP[normalized];
    const endpoint = API_ENDPOINTS[normalized];

    if (!tokenEnv || !endpoint) {
      console.error(chalk.red(`\n❌ Unknown API: ${apiName}\n`));
      console.log(chalk.yellow('Supported APIs: hubspot, slack, salesforce, airtable, awsS3, twillio, stripe, gcpBigQuery\n'));
      process.exit(1);
    }

    const token = process.env[tokenEnv];

    if (!token) {
      console.error(chalk.red(`\n❌ Credentials not configured\n`));
      console.log(chalk.yellow(`Set the ${tokenEnv} environment variable in .env\n`));
      process.exit(1);
    }

    console.log(chalk.bold(`\n🏥 Health Check: ${apiName}\n`));
    console.log('Testing connectivity and authentication...');

    const start = Date.now();

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'autom8-toolkit'
        },
        timeout: 5000,
        validateStatus: () => true // Don't throw on any status
      });

      const latency = Date.now() - start;
      const statusColor = response.status < 400 ? chalk.green : chalk.yellow;

      console.log(`\n${chalk.cyan.bold('Connection Details:')}`); 
      console.log(`  • Status: ${statusColor(response.status)} ${response.statusText}`);
      console.log(`  • Latency: ${latency}ms`);
      console.log(`  • Endpoint: ${endpoint}`);

      if (response.status < 400) {
        console.log(`\n${chalk.green('✓ Authentication successful')}`);
        console.log(`${chalk.green('✓ API is reachable')}\n`);
      } else if (response.status === 401 || response.status === 403) {
        console.log(`\n${chalk.red('✗ Authentication failed - check your credentials')}\n`);
      } else {
        console.log(`\n${chalk.yellow(`✓ Connection established (Status ${response.status})`)}\n`);
      }

    } catch (requestError: any) {
      console.log(`\n${chalk.red('✗ Connection failed')}`); 
      console.log(`${chalk.red(`Error: ${requestError.message}`)}\n`);
    }

  } catch (error: any) {
    console.error(chalk.red(`\n❌ Error: ${error.message}\n`));
    process.exit(1);
  }
}
