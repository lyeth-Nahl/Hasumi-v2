module.exports = {
    config: { nama: "poli" }, 
        
    Alya: async function(api, event) {
        try {
            const axios = require('axios');
            const fs = require('fs');
            const path = require('path');
            const text = event.body?.replace(":poli", "")?.trim().toLowerCase();
             if (!text) return api.sendMessage("Masukkan prompt nya bodo", event.threadID, event.messageID);
            // Fetching the image
            const response = await axios.get('https://kaiz-apis.gleeze.com/api/poli?prompt=${encodeURIComponent(text)}', {
                responseType: 'arraybuffer'
            });

            // Convert to buffer and save as a file
            const imageBuffer = Buffer.from(response.data, 'binary');
            const imagePath = path.join(__dirname, 'image.png'); // Save to current directory

            // Write the buffer to a file
            fs.writeFileSync(imagePath, imageBuffer);

            // Send the image
            api.sendMessage({ attachment: fs.createReadStream(imagePath) }, event.threadID, event.messageID);

        } catch (error) {
            api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
        }
    }
};
