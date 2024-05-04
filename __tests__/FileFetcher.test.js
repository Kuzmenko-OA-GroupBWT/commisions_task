const fs = require('fs');
const FileFetcher = require('../FileFetcher');

jest.mock('fs');

/**
 * Test suite for the FileFetcher class
 */
describe('FileFetcher', () => {
  let fileFetcher;
  const mockFilePath = './mockFilePath.json';

  /**
   * Set up for each test case
   * Creates a new instance of FileFetcher with a mock file path
   */
  beforeEach(() => {
    fileFetcher = new FileFetcher(mockFilePath);
  });

  /**
   * Test case: Fetches and parses a file correctly
   * Mocks the 'readFileSync' method of 'fs' to return a JSON string
   * Checks if the 'fetchFile' method of 'FileFetcher' returns the correct object
   * Checks if 'readFileSync' was called with the correct arguments
   */
  it('fetches and parses a file correctly', () => {
    const mockData = { key: 'value' };
    fs.readFileSync.mockReturnValue(JSON.stringify(mockData));

    const result = fileFetcher.fetchFile();

    expect(result).toEqual(mockData);
    expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath, 'utf8');
  });

  /**
   * Test case: Throws an error when file does not exist
   * Mocks the 'readFileSync' method of 'fs' to throw an error
   * Checks if the 'fetchFile' method of 'FileFetcher' throws the correct error
   */
  it('throws an error when file does not exist', () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error('File not found');
    });

    expect(() => fileFetcher.fetchFile()).toThrow('File not found');
  });

  /**
   * Test case: Throws an error when file content is not valid JSON
   * Mocks the 'readFileSync' method of 'fs' to return an invalid JSON string
   * Checks if the 'fetchFile' method of 'FileFetcher' throws an error
   */
  it('throws an error when file content is not valid JSON', () => {
    fs.readFileSync.mockReturnValue('invalid JSON');

    expect(() => fileFetcher.fetchFile()).toThrow();
  });
});
