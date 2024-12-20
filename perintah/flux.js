module.exports = {
    config: { nama: "flux" }, 
        
    Alya: async function(api, event) {
        try {
            const axios = require('axios');
            const fs = require('fs');
            const path = require('path');
            const prompt = event.body?.replace(":flux", "")?.trim().toLowerCase();
            const response = await axios.get(`https://raw.githubusercontent.com/HadyZen/Alya-Kujou/refs/heads/main/hady-zen/alya.png`, {
                responseType: 'arraybuffer'
            });

            const imageBuffer = Buffer.from(response.data, 'binary');
            const imagePath = path.join('data', 'image.png');

            api.sendMessage({ attachment: fs.createReadStream(imagePath) }, event.threadID, event.messageID);
             fs.unlinkSync(imagePath);

        } catch (error) {
            api.sendMessage(`Error ${error}`, event.threadID, event.messageID);
        }
    }
};
