const { Logging } = require('@google-cloud/logging');


const logging = new Logging({
  projectId: 'inspirationboard',
});

const logName = 'node-app-logs';
const log = logging.log(logName);

const writeLog = (message) => {
  const metadata = { resource: { type: 'global' } };
  const entry = log.entry(metadata, message);
  log.write(entry).catch(console.error);
};

module.exports = writeLog;
