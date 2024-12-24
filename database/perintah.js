const fs = require('fs');
const path = require('path');

// Fungsi untuk membaca file dan mendapatkan config.nama
function getConfigFromFile(filePath) {
    try {
        // Membaca file sebagai teks
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // Mengekstrak config.nama menggunakan regex
        const match = fileContent.match(/config\s*=\s*{\s*nama:\s*"([^"]+)"/);
        if (match && match[1]) {
            return match[1]; // Mengembalikan nama yang ditemukan
        }
    } catch (error) {
        console.error(`Gagal membaca file ${filePath}: ${error.message}`);
    }
    return null;
}

// Fungsi untuk membaca folder dan mencari semua file yang mengandung config.nama
function getAllConfigNames(folderPath) {
    try {
        // Membaca semua file dalam folder
        const files = fs.readdirSync(folderPath);

        // Menyimpan hasil nama config
        let configNames = [];

        files.forEach(file => {
            const filePath = path.join(folderPath, file);

            // Mengecek apakah file ini adalah file JavaScript (.js)
            if (path.extname(file) === '.js') {
                const configName = getConfigFromFile(filePath);
                if (configName) {
                    configNames.push(configName);
                }
            }
        });

        return configNames;
    } catch (error) {
        console.error(`Gagal membaca folder ${folderPath}: ${error.message}`);
        return [];
    }
}

// Tentukan folder tempat file-file config berada
const folderPath = path.join(__dirname, 'perintah');

// Mendapatkan semua nama config dari file-file dalam folder
const configNames = getAllConfigNames(folderPath);

// Menampilkan hasilnya
console.log('Config names found:', configNames);
