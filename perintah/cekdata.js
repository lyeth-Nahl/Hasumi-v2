module.exports = {
  config: { 
    nama: "cekd", 
    penulis: "Hady Zen", 
    kuldown: 6,
    peran: 0,
    tutor: ""
  }, 
  Alya: async function(api, event, cekdata) {
    api.sendMessage(`Nih: ${cekdata}`, event.threadID, event.messageID)
  }
};
