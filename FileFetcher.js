const fs = require('fs');

/**
 * FileFetcher class for fetching and parsing JSON files.
 */
class FileFetcher {
  /**
   * Create a FileFetcher.
   * @param {string} filePath - The path to the file to fetch.
   */
  constructor(filePath) {
    this.filePath = filePath;
  }

  /**
   * Fetch the file and parse it as JSON.
   * @return {Object} The parsed JSON object from the file.
   */
  fetchFile() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
  }
}

module.exports = FileFetcher;
