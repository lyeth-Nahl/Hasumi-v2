module.exports = {
    config: { nama: "flux" }, 
        
    Alya: async function(api, event) {
        try {
            const axios = require('axios');
            const fs = require('fs');
            const path = require('path');
            const prompt = event.body?.replace(":flux", "")?.trim().toLowerCase();
            
            // Fetching the image
            const response = await axios.get('https://raw.githubusercontent.com/HadyZen/Alya-Kujou/refs/heads/main/hady-zen/alya.png', {
                responseType: 'arraybuffer'
            });

            // Convert to buffer and save as a file
            const imageBuffer = Buffer.from(response.data, 'binary');
            const imagePath = path.join(__dirname, 'image.png'); // Save to current directory

            // Write the buffer to a file
            fs.writeFileSync(imagePath, imageBuffer);

            // Send the image
            api.sendMessage({ attachment: fs.createReadStream(imagePath) }, event.threadID, event.messageID, () => {
                // Delete the image after sending it
                fs.unlinkSync(imagePath);
            });

        } catch (error) {
            api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
        }
    }
};
