const fs = require('fs');

/**
 * FileFetcher class.
 * This class provides methods to fetch a file from a given path.
 */
class FileFetcher {
  /**
   * Create a FileFetcher.
   * @param {string} filePath - The path of the file to fetch.
   * @throws {Error} If the filePath is not a string or if the file does not exist.
   */
  constructor(filePath) {
    if (typeof filePath !== 'string') {
      throw new Error('File path must be a string');
    }

    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }

    this.filePath = filePath;
  }

  /**
   * Fetch the file from the filePath.
   * @return {Object} The content of the file parsed as JSON.
   */
  fetchFile() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
  }
}

/**
 * Expose `FileFetcher`.
 */
module.exports = FileFetcher;
