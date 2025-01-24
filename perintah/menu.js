const fs = require('fs/promises');
const path = require('path');
const { awalan, nama } = global.Syntora.config;

module.exports = {
  config: {
    nama: "menu",
    penulis: "Hady Zen", // modifed by Range
    peran: 0,
    kuldown: 10,
    tutor: "<cmd/kosong>"
  },
    
  Alya: async function ({ api, event, args, global }) {
    const files = await fs.readdir(path.join('./perintah'));
    const jsFiles = files.filter(file => path.extname(file) === '.js');
    jsFiles.sort();

    const commandList = { user: [], adminGroups: [], adminBot: [] };
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

          if (args[0] && args[0] === commandName) {
            commandInfo[commandName] = configData;
            break;
          }

          const peran = parseInt(configData.peran, 10);
          if (peran === 0) {
            commandList.user.push(commandName);
          } else if (peran === 1) {
            commandList.adminGroups.push(commandName);
          } else if (peran === 2) {
            commandList.adminBot.push(commandName);
          }
        }
      }
    }

    if (args[0] && commandInfo[args[0]]) {
      const info = commandInfo[args[0]];
      api.sendMessage(`# 𝗜𝗻𝗳𝗼 𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵
      
- Nama: ${info.nama}
- Penulis: ${info.penulis}
- Peran: ${info.peran}
- Kuldown: ${info.kuldown} detik
- Tutorial: ${info.tutor}`, event.threadID, event.messageID);
    } else if (args[0] && !commandInfo[args[0]]) {
      api.sendMessage(`Perintah ${args[0]} tidak ada senpai.`, event.threadID, event.messageID);
    } else if (!args[0]) {
      const description = `Gunakan ${awalan}menu <nama perintah> untuk melihat deskripsi lengkapnya, Official Bot ${nama}.`;
      const message = `# 𝗗𝗮𝗳𝘁𝗮𝗿 𝗣𝗲𝗿𝗶𝗻𝘁𝗮𝗵\n\n*USER*\n${commandList.user.join(', ') || 'Tidak ada perintah.'}\n\n*ADMIN GROUPS*\n${commandList.adminGroups.join(', ') || 'Tidak ada perintah.'}\n\n*ADMIN BOT*\n${commandList.adminBot.join(', ') || 'Tidak ada perintah.'}\n\n\n${description}`;
      api.sendMessage(message, event.threadID, event.messageID);
    }
  }
};
