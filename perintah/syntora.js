// const awalan = ["Syntora", "Syn"];
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

Alya: async function (api, event, args) { 
  // edit by Range
  const userID = api.sendMessage(event.senderID);
  const memo = "./perintah/Memory-Syn/SynMemo.json";
  const admID = JSON.parse(fs.readFileSync('config.json', 'utf8'));
  const adminAll = admID.admin;
  const isAdmin = adminAll.includes(userID);
  const text = args.join(' ');
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
  } else {
    return api.sendMessage("Masukkan pesan nya dulu...", event.threadID, event.messageID);
    }

  let memoData = JSON.parse(fs.readFileSync(memo, 'utf8'));
  if (isAdmin) {
      if (text.toLowerCase() === "delete all") {
        memoData = {};
        fs.writeFileSync(memo, JSON.stringify(memoData, null, 2));
        return api.sendMessage("Semua riwayat percakapan berhasil dihapus!", event.threadID, event.messageID);
      }
      
      if (text.startsWith("delete ")) {
        const targetID = text.split(" ")[1];
        if (memoData[targetID]) {
          delete memoData[targetID];
          fs.writeFileSync(memo, JSON.stringify(memoData, null, 2));
          return api.sendMessage(`Riwayat percakapan untuk ID ${targetID} berhasil dihapus!`, event.threadID, event.messageID);
        } else {
          return api.sendMessage(`Tidak ditemukan riwayat untuk ID ${targetID}.`, event.threadID, event.messageID);
        }
      }
    }
 }
};
