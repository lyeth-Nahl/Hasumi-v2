module.exports = {
  config: { 
    nama: "uid", 
    kuldown: 10
  }, 
  Alya: async function(api, event, args) {
    api.sendMessage(event.senderID, event.threadID, event.messageID);
    if (args[0]) {
      const p = Object.keys(event.mentions);
          api.sendMessage(p, event.threadID, event.messageID);
    }
  }
};
