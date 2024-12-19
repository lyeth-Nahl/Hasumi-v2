module.exports = {
 config: {
 nama: "meme"
},
  
    Alya: async function(api, event) {
      try { 
       const fs = require('fs');
       const axios = require('axios');
        const meme = await axios.get("https://raw.githubusercontent.com/HadyZen/hady-zen-api/refs/heads/main/meme.json");
        const itsuki = meme.data;
  const ft = itsuki[Math.floor(Math.random() * itsuki.length)];
       const response = await axios.get(ft, {
      responseType: 'arraybuffer', 
    });

    const wle = "https://raw.githubusercontent.com/HadyZen/Alya-Kujou/refs/heads/main/hady-zen/alya.png";
    fs.writeFileSync('foto.png', wle);
    const foto = fs.readFileSync('foto.png');
  api.sendMessage({ attachment: foto }, event.threadID, event.messageID);
     fs.unlinkSync('foto.png');
} catch (futaro) { 
  console.log(futaro);
}
 }
};
