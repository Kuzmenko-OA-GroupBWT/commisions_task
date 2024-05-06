const nock = require('nock');
const CommissionConfigFetcher = require('../CommissionConfigFetcher');

describe('CommissionConfigFetcher', () => {
  let fetcher;

  beforeEach(() => {
    fetcher = new CommissionConfigFetcher('http://api.example.com');
  });

  it('throws an error when constructed with an invalid URL', () => {
    expect(() => new CommissionConfigFetcher('not a url')).toThrow('Invalid API URL');
  });

  it('throws an error when fetchConfig is called with a non-string endpoint', () => {
    expect(fetcher.fetchConfig(123)).rejects.toThrow('Endpoint must be a string');
  });

  it('fetches config from the correct endpoint', async () => {
    const endpoint = 'config';
    const mockData = { key: 'value' };

    nock('http://api.example.com')
      .get(`/${endpoint}`)
      .reply(200, mockData);

    const data = await fetcher.fetchConfig(endpoint);

    expect(data).toEqual(mockData);
  });

  it('throws an error when the API request fails', async () => {
    const endpoint = 'config';

    nock('http://api.example.com')
      .get(`/${endpoint}`)
      .replyWithError('API request failed');

    await expect(fetcher.fetchConfig(endpoint)).rejects.toThrow('API request failed');
  });
});
