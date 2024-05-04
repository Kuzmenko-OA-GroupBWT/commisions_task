const axios = require('axios');

/**
 * Class representing a commission configuration fetcher.
 */
class CommissionConfigFetcher {
  /**
   * Create a commission configuration fetcher.
   * @param {string} apiUrl - The base URL of the API.
   */
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  /**
   * Fetch the commission configuration from a specific endpoint.
   * @param {string} endpoint - The endpoint to fetch the configuration from.
   * @return {Object} The data from the response.
   */
  async fetchConfig(endpoint) {
    const response = await axios.get(`${this.apiUrl}/${endpoint}`);
    return response.data;
  }
}

module.exports = CommissionConfigFetcher;
