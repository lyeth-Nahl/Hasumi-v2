const fs = require('fs');
const axios = require('axios');
const { spawn } = require("child_process");
const { logo } = require('./hady-zen/log');

async function cek() {
  const { data } = await axios.get('https://raw.githubusercontent.com/HadyZen/Alya-Kujou/refs/heads/main/package.json');
  if (JSON.parse(fs.readFileAsync('package.json', 'utf8').version !== data.version)) { 
   return 'belum';
  } else {
    return 'udah';
  }
}

function update() {
  if (cek() == 'belum') {
    console.log(logo.info
    const child = spawn("git clone https://github.com/HadyZen/Alya-Kujou && cp -r Alya-Kujou/. . && rm -rf Alya-Kujou", {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });
  } else { 
   console.log(logo.info + 'Alya sudah menggunakan versi terbaru');
  }
}
