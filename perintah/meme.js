module.exports = {
 config: {
 nama: "meme"
},
  
    Alya: async function(api, event) {
      try { 
       const axios = require('axios');
        const meme = await axios.get("https://raw.githubusercontent.com/HadyZen/hady-zen-api/refs/heads/main/meme.json");
        const itsuki = meme.data;
  const foto = itsuki[Math.floor(Math.random() * itsuki.length)];
  api.sendMessage({ attachment:  foto }, event.threadID, event.messageID);
} catch (futaro) { 
  console.log(futaro);
}
 }
};
