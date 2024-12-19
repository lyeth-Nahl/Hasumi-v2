module.exports = {
 config: {
 nama: "meme"
},
  
    Alya: async function(api, event) {
      try { 
       const axios = require('axios');
        const meme = await axios.get("https://raw.githubusercontent.com/HadyZen/hady-zen-api/refs/heads/main/meme.json");
        const itsuki = meme.data;
  const imageLink = itsuki[Math.floor(Math.random() * itsuki.length)];

const img = new Image();
img.src = imageLink;

img.onload = () => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  var foto = canvas.toDataURL('image/jpeg');
};
  api.sendMessage({ attachment:  foto }, event.threadID, event.messageID);
} catch (futaro) { 
  console.log(futaro);
}
 }
};
