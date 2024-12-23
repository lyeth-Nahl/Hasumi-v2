module.exports = {
  config: { 
    nama: "tes", 
    kuldown: 1
  }, 
  Alya: async function(api, event) {
    const { adminIDs } = api.getThreadInfo(event.threadID);
    api.sendMessage(adminIDs, event.threadID);
  }
};
