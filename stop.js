/* HADY ZEN'IN */

function stop() {
  console.clear();
  const { logo } = require('./hady-zen/log');
  console.log(logo.info + "Alya telah diperintahkan untuk berhenti.");
  process.exit(1);
};
stop();
