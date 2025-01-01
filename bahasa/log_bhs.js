*/ HADY ZEN'IN */

const fs = require('fs');
const path = require('path');

function bhs() {
 const hadi = fs.readFileSync(path.join('config.json'), 'utf-8');  
 const { bahasa } = JSON.parse(hadi);  
 const alya = path.join('bahasa', `${bahasa}.bhs`);
  
if (fs.existsSync(alya)) {
 const kazuya = fs.readFileSync(alya, 'utf-8');
 const itsuki = JSON.parse(kazuya);
 return itsuki;
} else {
 return '✘';
 }
}

const log_bhs = bhs();
module.exports = { log_bhs };
