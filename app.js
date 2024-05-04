// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const FileFetcher = require('./FileFetcher');
const CommissionConfigFetcher = require('./CommissionConfigFetcher');
const CommissionCalculator = require('./CommissionCalculator');

// Define the main API URL from environment variables
const API_URL = process.env.MAIN_API;

// Create new instances of FileFetcher and CommissionConfigFetcher
const fileFetcher = new FileFetcher(process.argv[2]);
const configFetcher = new CommissionConfigFetcher(API_URL);

/**
 * Asynchronous function to calculate commissions.
 * Fetches configuration for cash-in, cash-out-natural, and cash-out-juridical operations.
 * Then, for each operation in the data fetched from the file, it calculates
 * and logs the commission.
 */
async function calculateCommissions() {
  // Fetch data from file
  const data = fileFetcher.fetchFile();

  // Fetch configurations for different types of operations
  const cashInConfig = await configFetcher.fetchConfig('cash-in');
  const cashOutNaturalConfig = await configFetcher.fetchConfig('cash-out-natural');
  const cashOutJuridicalConfig = await configFetcher.fetchConfig('cash-out-juridical');

  // Store configurations in an object
  const configurations = {
    cash_in: cashInConfig,
    cash_out_natural: cashOutNaturalConfig,
    cash_out_juridical: cashOutJuridicalConfig,
  };

  // Create a new instance of CommissionCalculator with the fetched configurations
  const calculator = new CommissionCalculator(configurations);

  // For each operation in the data, calculate and log the commission
  data.forEach((operation) => {
    const commission = calculator.calculateCommission(operation);
    // eslint-disable-next-line no-console
    console.log(commission);
  });
}

// Call the calculateCommissions function and catch any errors
// eslint-disable-next-line no-console
calculateCommissions().catch(console.error);
