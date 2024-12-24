const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
  config: {
    nama: "uptime",
    kuldown: 10,
    penulis: "Hady Zen",
    peran: 0,
    tutor: ""
  },

Alya: async function (api, event) {
     const uptime = process.uptime();
     const jam = Math.floor(uptime / 3600);
     const menit = Math.floor((uptime % 3600) / 60);

     const totalMemory = os.totalmem();
     const freeMemory = os.freemem();
     const usedMemory = totalMemory - freeMemory;

     const chika = Date.now();
     const arif = `${jam}𝗁 ${menit}𝗆`;
    
     const diskUsage = await getDiskUsage();
     const edi = `${prettyBytes(diskUsage.used)}/${prettyBytes(diskUsage.total)}`;
     const riley = `${prettyBytes(os.totalmem() - os.freemem())}/${prettyBytes(totalMemory)}`;
     const veli = os.freemem();
     const saveng = `${prettyBytes(os.totalmem() - os.freemem())}/${prettyBytes(veli)}`;
     const putra = await usersData.getAll();
     const loufi = await threadsData.getAll(); 
     const luxion = `${os.type()} ${os.release()}`;
     const rizky = `${os.cpus()[0].model}`;
     const nino = Date.now();
     const raffa = nino - chika;

     const hadi = `[ ${ping(raffa)} | ${raffa} ] • 𝗨𝗣𝗧𝗜𝗠𝗘 ♡\n`
                 + `\n- 𝖳𝗈𝗍𝖺𝗅 𝗎𝗌𝖾𝗋: ${putra.length}`
                 + `\n- 𝖳𝗈𝗍𝖺𝗅 𝗀𝗋𝗎𝗉: ${loufi.length}`
                 + `\n- 𝖴𝗉𝗍𝗂𝗆𝖾: ${arif}`
                 + `\n- 𝖣𝗂𝗌𝗄: ${edi}`
                 + `\n- 𝖱𝖺𝗆: ${riley}`
                 + `\n- 𝖬𝖾𝗆𝗈𝗋𝗒: ${saveng}` 
                 + `\n- 𝖢𝖯𝖴: ${rizky} (${os.cpus().length} 𝖼𝗈𝗋𝖾𝗌)`;

api.sendMessage(hadi, event.threadID, event.messageID);

async function getDiskUsage() {
  const { stdout } = await exec('df -k /');
  const [_, total, used] = stdout.split('\n')[1].split(/\s+/).filter(Boolean);
  return { total: parseInt(total) * 1024, used: parseInt(used) * 1024 };
}

function prettyBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

function ping(raffa) { 
  if (raffa < 110) {
    return "🔵";
} else if (raffa < 330) {
     return "🟢";
} else if (raffa < 660) {
     return "🟡";
} else if (raffa < 990) {
     return "🟠";
} else {
     return "🔴";
 }
       }
