/* HADY ZEN'IN */

const hady = require('child_process');
const { logo } = require('./hady-zen/log');

function restar() {
  console.log(logo.info + 'Alya akan dimulai ulang...');
  hady.exec('npm start');
  process.exit();
}

restar();
