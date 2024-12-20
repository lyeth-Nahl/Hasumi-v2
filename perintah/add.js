const config = { 
  nama: "add",
  kuldown: 6
};

async function Alya(api, event) { 
  const axios = require('axios');
  const text = event.body?.replace(":add", "")?.trim().toLowerCase();

  if (text) {
     try { 
      api.addUserToGroup(text, event.threadID);
     } catch (e) {
       console.log(e);
     }
  } else {
    return api.sendMessage("Masukkan id nya bodo", event.threadID, event.messageID);
  }
}
module.exports = { config, Alya };
