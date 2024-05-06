const axios = require('axios');
const url = require('url');

/**
 * Class representing a commission configuration fetcher.
 */
class CommissionConfigFetcher {
  /**
   * Create a commission configuration fetcher.
   * @param {string} apiUrl - The API URL.
   * @throws {Error} Will throw an error if the API URL is not a string
   * or does not contain a protocol.
   */
  constructor(apiUrl) {
    if (typeof apiUrl !== 'string' || !url.parse(apiUrl).protocol) {
      throw new Error('Invalid API URL');
    }

    this.apiUrl = apiUrl;
  }

  /**
   * Fetch the commission configuration from a specific endpoint.
   * @param {string} endpoint - The endpoint to fetch the configuration from.
   * @return {Object} The commission configuration data.
   * @throws {Error} Will throw an error if the endpoint is not a string.
   */
  async fetchConfig(endpoint) {
    if (typeof endpoint !== 'string') {
      throw new Error('Endpoint must be a string');
    }

    const response = await axios.get(`${this.apiUrl}/${endpoint}`);
    return response.data;
  }
}

module.exports = CommissionConfigFetcher;
