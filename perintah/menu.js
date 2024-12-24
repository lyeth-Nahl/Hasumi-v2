const fs = require('fs/promises');
const path = require('path');

async function Alya(api, message, args) {
  const folderPath = path.join('./perintah');

  try {
    const files = await fs.readdir(folderPath);
    const jsFiles = files.filter(file => path.extname(file) === '.js');
    jsFiles.sort();

    // Membaca isi dari setiap file dan mencari config.nama
    const commandList = [];
    const commandInfo = {};  // Untuk menyimpan informasi perintah

    for (const file of jsFiles) {
      const filePath = path.join(folderPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');

      // Mencari objek config.nama, baik dalam format const config maupun module.exports.config
      let configMatch = fileContent.match(/const\s+config\s*=\s*{[^}]*nama\s*:\s*"([^"]+)"/);
      if (!configMatch) {
        // Jika tidak ditemukan dalam format const config, coba cari dalam module.exports.config
        configMatch = fileContent.match(/config\s*:\s*{[^}]*nama\s*:\s*"([^"]+)"/);
      }
      
      if (configMatch) {
        const commandName = configMatch[1];
        if (args[0] && args[0] === commandName) {
          // Menyimpan informasi perintah ketika argumen cocok dengan nama perintah
          let configObj = fileContent.match(/const\s+config\s*=\s*{([^}]+)}/);
      if (!configObj) {
        // Jika tidak ditemukan dalam format const config, coba cari dalam module.exports.config
        configObj = fileContent.match(/config\s*:\s*{([^}]+)}/);
      }
          if (configObj) {
            // Ekstrak informasi config
            const configData = configObj[1].split(',').reduce((acc, line) => {
              const [key, value] = line.split(':').map(str => str.trim().replace(/"/g, ''));
              acc[key] = value;
              return acc;
            }, {});
            // Menyimpan informasi perintah dalam object
            commandInfo[commandName] = configData;
          }
          break;  // Hentikan perulangan setelah menemukan perintah yang diminta
        } else {
          commandList.push(commandName);  // Menambahkan nama perintah ke daftar
        }
      }
    }

    // Jika ada informasi perintah yang ditemukan, kirimkan informasinya
    if (args[0] && commandInfo[args[0]]) {
      const info = commandInfo[args[0]];
      api.sendMessage(`# Informasi Perintah: \n\nNama: ${info.nama}\nPenulis: ${info.penulis}\nPeran: ${info.peran}\nCooldown: ${info.kuldown} detik\nTutorial: ${info.tutor}`, message.threadID, message.messageID);
    } else if (args[0] && !commandInfo[args[0]]) { 
      api.sendMessage(`Perintah ${args[0]} tidak ada.`, message.threadID, message.messageID);
    } else if (!args[0]) {
      // Kirim daftar perintah jika tidak ada argumen atau perintah yang diminta tidak ditemukan
      api.sendMessage(`# Daftar perintah: \n\n${commandList.join('\n')}`, message.threadID, message.messageID);
    }

  } catch (error) {
    console.error(error);
  }
}

const config = { 
  nama: "menu",
  penulis: "Hady Zen", 
  peran: 0,
  kuldown: 10,
  tutor: "<cmd/kosong>"
};

module.exports = { Alya, config };
