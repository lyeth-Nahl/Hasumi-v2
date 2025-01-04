module.exports = {
  config: { 
    nama: "tid", 
    penulis: "Hady Zen", 
    kuldown: 10,
    peran: 0,
    tutor: ""
  }, 
  Alya: async function ({ api, event }) {
    api.sendMessage(event.threadID, event.threadID, event.messageID)
  }
};
