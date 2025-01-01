/* HADY ZEN'IN */

const { logo } = require('./hady-zen/log');

process.on('SIGINT', function() {
  console.log(logo.info + 'Alya diperintahkan berhenti...');
  process.exit();
});
