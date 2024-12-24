module.exports = {
  config: { 
    nama: "uid", 
    kuldown: 10
  }, 
  Alya: async function(api, event, args) {
    if (args[0]) {
      const p = event.mentions;
          api.sendMessage("nih: " + p, event.threadID, event.messageID);
    } else { 
      api.sendMessage(event.senderID, event.threadID, event.messageID);
    }
  }
};
