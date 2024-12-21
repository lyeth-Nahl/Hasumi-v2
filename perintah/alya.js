const config = { 
  nama: "alya",
  penulis: "Hady Zen", 
  kuldown: 10,
  role: 0,
  tutor: "<pertanyaan>"
};

async function Alya(api, event, args) { 
  const axios = require('axios');
  const text = args.join(' ');

  if (text) {
      const hady = `nama kamu adalah Alya Kujou. User input: ${text}`;
      const respon = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(hady)}`);
      if (respon.data.answer) {
        return api.sendMessage(respon.data.answer, event.threadID, event.messageID);
      } else {
        return api.sendMessage("gak di jawab", event.threadID, event.messageID);
      }
  } else {
    return api.sendMessage("Masukkan pesan nya bodo", event.threadID, event.messageID);
  }
}
module.exports = { config, Alya };
