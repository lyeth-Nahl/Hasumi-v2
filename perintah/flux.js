module.exports = {
    config: { nama: "flux" },

    Alya: async function(api, event) {
        try {
            const axios = require('axios');
            const fs = require('fs/promises'); // Menggunakan fs/promises untuk operasi asynchronous
            const path = require('path');
            const prompt = event.body?.replace(":flux", "")?.trim().toLowerCase(); // toLowerCase() bukan tolowercase()

            const response = await axios.get(`https://raw.githubusercontent.com/hadyzen/alya-kujou/refs/heads/main/hady-zen/alya.png`, {
                responseType: 'arraybuffer' // responseType, bukan responsetype
            });

            const imageBuffer = Buffer.from(response.data, 'binary'); // Menggunakan Buffer.from, bukan buffer.from
            const imagePath = path.join(__dirname, 'image.png'); // Menggunakan __dirname untuk path yang benar

            await fs.writeFile(imagePath, imageBuffer); // Menulis buffer ke file secara asynchronous

            await api.sendMessage({ attachment: fs.createReadStream(imagePath) }, event.threadID, event.messageID); // Menggunakan threadID dan messageID yang benar
            await fs.unlink(imagePath); // Menghapus file secara asynchronous

        } catch (error) {
            api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID); // Menampilkan pesan error yang lebih informatif
        }
    }
};
