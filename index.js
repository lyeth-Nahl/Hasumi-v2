/* HADY ZEN'IN */

const { spawn } = require('child_process');
const { logo, warna } = require('./hady-zen/log');

setInterval(function() {
  console.clear();
}, 10000); 

function hady() {
  const child = spawn("node Alya.js", {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  setTimeout(() => {
    console.log(warna.biru + `▄▀█ █░ █▄█ ▄▀█  █▄▀ █░█ ░█ █▀█ █░█\n█▀█ █▄ ░█░ █▀█  █░█ █▄█ ▄█ █▄█ █▄█`);
    console.log(logo.info + "Chatbot messenger by hady and saveng.");
  }, 1000);

  child.on("close", (code) => {
    if (code == 2) {
      hady(); 
    }
  });
}
