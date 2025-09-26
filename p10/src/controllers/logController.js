const fs = require('fs');
const path = require('path');

exports.viewLogs = (req, res) => {
  const logPath = path.join(__dirname, '../../logs/error.log.txt');

  fs.readFile(logPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err.message);
      return res.status(500).send('<h2>Error: Unable to read log file.</h2>');
    }

    res.send(`
      <html>
        <head>
          <title>Server Logs</title>
          <style>
            body { font-family: monospace; background: #111; color: #0f0; padding: 20px; }
            pre { white-space: pre-wrap; word-wrap: break-word; }
          </style>
        </head>
        <body>
          <h1>📜 Server Logs</h1>
          <pre>${data}</pre>
        </body>
      </html>
    `);
  });
};
