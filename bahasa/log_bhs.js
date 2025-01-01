*/ HADY ZEN'IN */

const fs = require('fs');
const path = require('path');

global.bhs = cek();
function cek() {
 const hadi = fs.readFileSync('config.json', 'utf-8');
 const { bahasa } = JSON.parse(hadi);
 return bahasa;
}
function bhs() {
 let alya = path.join('bahasa', `${cek()}.bhs`);
  
if (!fs.existsSync(alya)) {
  alya = path.join('bahasa', 'id.bhs');
} 
 const kazuya = fs.readFileSync(alya, 'utf-8');
 const itsuki = JSON.parse(kazuya);
 return itsuki;
}

const log_bhs = bhs();
module.exports = { log_bhs };
