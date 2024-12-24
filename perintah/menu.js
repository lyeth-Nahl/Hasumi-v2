const fs = require('fs/promises');
const path = require('path');

async function Alya(api, message) {
  const folderPath = path.join('./perintah');

  try {
    const files = await fs.readdir(folderPath);
    const jsFiles = files.filter(file => path.extname(file) === '.js');
    jsFiles.sort();

    // Membaca isi dari setiap file dan mencari config.nama
    const commandList = [];

    for (const file of jsFiles) {
      const filePath = path.join(folderPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');

      // Mencari objek config.nama, baik dalam format const config maupun module.exports.config
      let configMatch = fileContent.match(/const\s+config\s*=\s*{[^}]*nama\s*:\s*"([^"]+)"/);
      if (!configMatch) {
        // Jika tidak ditemukan dalam format const config, coba cari dalam module.exports.config
        configMatch = fileContent.match(/module\.exports\.config\s*=\s*{[^}]*nama\s*:\s*"([^"]+)"/);
      }

      if (configMatch) {
        commandList.push(configMatch[1]);  // Menambahkan nama perintah ke daftar
      }
    }

    // Mengirimkan daftar perintah
    api.sendMessage(`# Daftar perintah: \n\n${commandList.join('\n')}`, message.threadID, message.messageID);
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
