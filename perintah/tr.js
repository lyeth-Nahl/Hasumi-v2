const config = { 
  nama: tr",
  kuldown: 10
};

async function Alya(api, event) { 
  const axios = require('axios');
  const text = event.body?.replace(":tr", "")?.trim().toLowerCase();

  if (text) {
      const hady = text[1].join(' ');
      const bhs = text[0];
      const respon = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${bhs}&dt=t&q=${encodeURIComponent(hady)}`);
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
