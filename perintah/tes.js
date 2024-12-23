module.exports = {
  config: { 
    nama: "tes", 
    kuldown: 1
  }, 
  Alya: async function(api, event) {
    const p = api.getThreadInfo(event.threadID);
    api.sendMessage(`Nih: ${p.adminIDs}`, event.threadID);
  }
};
