module.exports = {
  config: { nama: "tid" }, 
  Alya: async function(api, message) {
    api.sendMessage(message.threadID, message.threadID, message.messageID)
  }
};