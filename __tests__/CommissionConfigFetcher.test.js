const axios = require('axios');
const CommissionConfigFetcher = require('../CommissionConfigFetcher');

jest.mock('axios');

/**
 * Test suite for the CommissionConfigFetcher class.
 */
describe('CommissionConfigFetcher', () => {
  let commissionConfigFetcher;
  /**
   * Mock API URL for testing.
   * @type {string}
   */
  const mockApiUrl = 'http://mockapi.com';
  /**
   * Mock endpoint for testing.
   * @type {string}
   */
  const mockEndpoint = 'endpoint';

  /**
   * Setup for each test case. Initializes a new CommissionConfigFetcher instance.
   */
  beforeEach(() => {
    commissionConfigFetcher = new CommissionConfigFetcher(mockApiUrl);
  });

  /**
   * Test case for a successful fetch operation.
   */
  it('fetches configuration correctly', async () => {
    const mockData = { key: 'value' };
    // Mocking a successful axios get request
    axios.get.mockResolvedValue({ data: mockData });

    const result = await commissionConfigFetcher.fetchConfig(mockEndpoint);

    // Expecting the result to be equal to the mock data
    expect(result).toEqual(mockData);
    // Expecting axios.get to have been called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(`${mockApiUrl}/${mockEndpoint}`);
  });

  /**
   * Test case for a failed fetch operation.
   */
  it('throws an error when API request fails', async () => {
    // Mocking a failed axios get request
    axios.get.mockRejectedValue(new Error('API request failed'));

    // Expecting the fetchConfig method to throw an error
    await expect(commissionConfigFetcher.fetchConfig(mockEndpoint)).rejects.toThrow('API request failed');
  });
});
