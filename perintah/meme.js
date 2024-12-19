module.exports = {
 config: {
 nama: "meme"
},
  
    Alya: async function(api, event) {
      try { 
       const axios = require('axios');
        const meme = await axios.get("https://raw.githubusercontent.com/HadyZen/hady-zen-api/refs/heads/main/meme.json");
        const itsuki = meme.data;
  const ft = itsuki[Math.floor(Math.random() * itsuki.length)];
       const response = await axios.get(ft, {
      responseType: 'arraybuffer', 
    });

    const foto = response.data;
  api.sendMessage({ attachment:  foto }, event.threadID, event.messageID);
} catch (futaro) { 
  console.log(futaro);
}
 }
};
