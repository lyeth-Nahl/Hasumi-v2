const axios = require('axios');
module.exports = {
  config: { 
    nama: "math", 
    penulis: "Hady Zen", 
    kuldown: 10,
    peran: 0,
    tutor: "<soal>"
  }, 
  Alya: async function ({ api, event, args }) {
try { 
    const soal = args.join(' ');
    if (!soal) {
     api.sendMessage('Masukkan soal mu sayank', event.threadID, event.messageID)
}
    const jumlah = await axios.get(`http://api.mathjs.org/v4/?expr=${encodeURIComponent(soal)}`);
    const hasil = jumlah.data;
    if (hasil && jumlah.data) {
     return api.sendMessage(soal + " =  " + hasil, event.threadID, event.messageID)
} else {
  api.sendMessage("Soal kamu tidak valid", event.threadID, event.messageID)
}
} catch (error) {
  api.sendMessage('Error: ' + error, event.threadID, event.messageID)
}
  }
};
