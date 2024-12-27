module.exports = {
  config: { 
    nama: "cekd", 
    penulis: "Hady Zen", 
    kuldown: 6,
    peran: 0,
    tutor: ""
  }, 
  Alya: async function(api, event, database) {
    api.sendMessage(`Nih: ${database[event.senderID]}`, event.threadID, event.messageID)
  }
};
