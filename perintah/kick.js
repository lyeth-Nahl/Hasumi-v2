const config = { nama: "kick" };

async function Alya(api, event) { 
  const axios = require('axios');
  const text = event.body?.replace(":kick", "")?.trim().toLowerCase();

  if (text) {
     try { 
      api.removeUserFromGroup(text, event.threadID, event.messageID);
     } catch (e) {
       console.log(e);
     }
  } else {
    return api.sendMessage("Masukkan id nya bodo", event.threadID, event.messageID);
  }
}
module.exports = { config, Alya };
