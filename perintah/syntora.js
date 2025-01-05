const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: { 
    nama: "syntora",
    penulis: "Range", 
    kuldown: 10,
    peran: 0,
    tutor: "<pertanyaan>"
  }, 

  Alya: async function ({ api, event, args }) { 
    const userID = event.senderID;
    const memo = "./perintah/Memory-Syn/SynMemo.json";
    const isAdmin = global.Syntora.config.admin.includes(userID);
    let memoData = JSON.parse(fs.readFileSync(memo, 'utf8'));
    const text = args.join(' ');

    if (!fs.existsSync("./perintah/Memory-Syn")) return fs.mkdirSync("./perintah/Memory-Syn", { recursive: true });
    if (!fs.existsSync(memo)) return fs.writeFileSync(memo, JSON.stringify([]));

    if (isAdmin && text.startsWith("delete")) {
      if (text.toLowerCase() === "delete all") {
        memoData = {};
        fs.writeFileSync(memo, JSON.stringify(memoData, null, 2));
        return api.sendMessage("Semua riwayat percakapan berhasil dihapus!", event.threadID, event.messageID);
      }
      
      const splitText = text.split(" ");
      if (splitText[0] === "delete" && splitText[1]) {
        const targetID = splitText[1];
        const userInfo = await api.getUserInfo(targetID);
        if (memoData[targetID]) {
          delete memoData[targetID];
          fs.writeFileSync(memo, JSON.stringify(memoData, null, 2));
          return api.sendMessage(`Riwayat percakapan dengan ${userInfo[targetID].name} berhasil dihapus!`, event.threadID, event.messageID);
        } else {
          return api.sendMessage(`Tidak ditemukan riwayat untuk ID ${targetID}.`, event.threadID, event.messageID);
      }
     }
      return api.sendMessage("Format perintah delete salah! Gunakan `/syntora delete [userID]` atau `/syntora delete all`.", event.threadID, event.messageID);
    }

    if (text) {
      let previousText = memoData[userID]?.text || "No Input";
      memoData[userID] = { text: text };
      fs.writeFileSync(memo, JSON.stringify(memoData, null, 2));

      const hady = `Nama kamu adalah Syntora Dynamix, Kamu adalah artificial intelligence bot yang ramah dan baik hati, Kamu di ciptakan oleh tim pengembang dari kolaborasi nebula dan shenix. User input: ${text}, User Previous Input: ${previousText}`;
      const { data } = await axios.get(`https://api-rangestudio.vercel.app/api/gemini?text=${encodeURIComponent(hady)}`);

      if (data.answer) {
        return api.sendMessage(data.answer, event.threadID, event.messageID);
      } else {
        return api.sendMessage("Tidak dapat merespon!", event.threadID, event.messageID);
      }
    }
    return api.sendMessage("Masukkan pesannya dulu...", event.threadID, event.messageID);
  }
};
