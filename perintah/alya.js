const config = { nama: "alya" };

async function Alya(api, message) { 
  const axios = require('axios');
  const text = message.body?.replace(":alya", "")?.trim().toLowerCase();

  if (text) {
      const hady = `nama kamu adalah Alya Kujou. User input: ${text}`;
      const respon = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(hady)}`);
      if (respon.data.answer) {
        return api.sendMessage(respon.data.answer, message.threadID, message.messageID);
      } else {
        return api.sendMessage("gak di jawab", message.threadID, message.messageID);
      }
  } else {
    return api.sendMessage("Masukkan pesan nya bodo", message.threadID, message.messageID);
  }
}
module.exports = { config, Alya };
