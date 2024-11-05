import path from 'path';
import fs from 'fs';

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('task', {
    writeNetworkLog({ filename, data }: { filename: string; data: string }) {
      const filePath = path.join(__dirname, '..', 'logs', filename);
      return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
          if (err) {
            console.error('Error writing log file:', err);
            return reject(err);
          }
          console.log('Log file written:', filePath);
          resolve(null);
        });
      });
    },
  });
};
