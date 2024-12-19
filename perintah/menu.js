const fs = require('fs/promises');
const path = require('path');

async function Alya(api, message) {
  const folderPath = path.join('./perintah');

  try {
    // Read directory asynchronously
    const files = await fs.readdir(folderPath);

    // Filter for .js files
    const jsFiles = files.filter(file => path.extname(file) === '.js');

    // Sort files alphabetically
    jsFiles.sort();

    // Join file names into a single string, removing the .js extension
    const commandList = jsFiles.map(file => path.basename(file, '.js')).join('\n');
    api.sendMessage(`# Daftar perintah: \n\n${commandList}`, message.threadID, message.messageID);
  } catch (error) {
    
  }
}

const config = { nama: "menu" };
module.exports = { Alya, config };