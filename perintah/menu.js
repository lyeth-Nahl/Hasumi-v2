const fs = require('fs/promises');
const path = require('path');
module.exports = { 
  config: { 
  nama: "menu",
  penulis: "Hady Zen", 
  peran: 0,
  kuldown: 10,
  tutor: "<cmd/kosong>"
  }, 
  
Alya: async function (api, message, args) {
  try {
    const files = await fs.readdir(path.join('./perintah'));
    const jsFiles = files.filter(file => path.extname(file) === '.js');
    jsFiles.sort();

    const commandList = [];
    const commandInfo = {};  

    for (const file of jsFiles) {
      const filePath = path.join(path.join('./perintah'), file);
      const fileContent = await fs.readFile(filePath, 'utf-8');

      let configMatch = fileContent.match(/const\s+config\s*=\s*{[^}]*nama\s*:\s*"([^"]+)"/);
      if (!configMatch) {
        configMatch = fileContent.match(/config\s*:\s*{[^}]*nama\s*:\s*"([^"]+)"/);
      }
      
      if (configMatch) {
        const commandName = configMatch[1];
        if (args[0] && args[0] === commandName) {
          let configObj = fileContent.match(/const\s+config\s*=\s*{([^}]+)}/);
      if (!configObj) {
        configObj = fileContent.match(/config\s*:\s*{([^}]+)}/);
      }
          if (configObj) {
            const configData = configObj[1].split(',').reduce((acc, line) => {
              const [key, value] = line.split(':').map(str => str.trim().replace(/"/g, ''));
              acc[key] = value;
              return acc;
            }, {});
            commandInfo[commandName] = configData;
          }
          break; 
        } else {
          commandList.push("-" + commandName); 
        }
      }
    }

    if (args[0] && commandInfo[args[0]]) {
      const info = commandInfo[args[0]];
      api.sendMessage(`# Informasi Perintah: \n\nNama: ${info.nama}\nPenulis: ${info.penulis}\nPeran: ${info.peran}\nCooldown: ${info.kuldown} detik\nTutorial: ${info.tutor}`, message.threadID, message.messageID);
    } else if (args[0] && !commandInfo[args[0]]) { 
      api.sendMessage(`Perintah ${args[0]} tidak ada.`, message.threadID, message.messageID);
    } else if (!args[0]) {
      api.sendMessage(`# Daftar perintah: \n\n${commandList.join('\n')}`, message.threadID, message.messageID);
    }

  } catch (error) {
    console.error(error);
  }
 }
}
