const config = { nama: "add" };

async function Alya(api, event) { 
  const axios = require('axios');
  const text = event.body?.replace(":add", "")?.trim().toLowerCase();

  if (text) {
      api.addUserToGroup(text, event.threadID, event.messageID);
  } else {
    return api.sendMessage("Masukkan id nya bodo", event.threadID, event.messageID);
  }
}
module.exports = { config, Alya };
