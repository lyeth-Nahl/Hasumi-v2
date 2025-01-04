const fs = require("fs");
const path = require("path");
const axios = require("axios");

function getDomain(url) {
  const domain = url.match(/https?:\/\/([^\/]+)/);
  return domain ? domain[1] : null;
}

module.exports = {
  config: { 
    nama: "cmd", 
    penulis: "Range", 
    peran: 2,
    kuldown: 6,
    tutor: "<nama file>"
  }, 
  Alya: async function(api, event, args) {
    const folderPath = "perintah";
    const pilih = ["install", "delete", "load", "loadall"];
    const awal = args[0];
    const namaFile = args[1];
    const link = args[2];
    
    // Install Logika
    if (awal === pilih[0]) {
      try {
        if (link) {
          const domain = getDomain(link);
          
          if (!domain) {
            return api.sendMessage("URL tidak valid.", event.threadID);
          }
          
          if (domain === "pastebin.com") {
            const regex = /https:\/\/pastebin\.com\/(?!raw\/)(.*)/;
            if (link.match(regex)) {
              link = link.replace(regex, "https://pastebin.com/raw/$1");
            }
            if (link.endsWith("/")) {
              link = link.slice(0, -1);
            }
          }

          // Coba lakukan permintaan GET untuk mengunduh file
          const response = await axios.get(link, { 
            headers: {
              'Accept': 'application/json',  // Menambahkan header agar permintaan lebih umum
            }
          });
          
          // Periksa apakah status response adalah 200, yang berarti berhasil
          if (response.status === 200) {
            const filePath = path.join(folderPath, `${namaFile}.js`);
            fs.writeFileSync(filePath, response.data);
            api.sendMessage(`File ${namaFile}.js berhasil diunduh dan disimpan.`, event.threadID);
          } else {
            api.sendMessage(`Gagal mengunduh file. Status: ${response.status}`, event.threadID);
          }
        }
        // Jika tidak ada link, anggap pengguna memberikan kode langsung
        else if (namaFile && namaFile.endsWith('.js')) {
          const filePath = path.join(folderPath, namaFile);
          // Menyimpan kode yang dikirim sebagai file
          fs.writeFileSync(filePath, args.slice(2).join(" "));
          api.sendMessage(`File ${namaFile}.js berhasil dibuat dengan kode yang diberikan.`, event.threadID);
        } else {
          api.sendMessage("Gunakan format: cmd install <namaFile> <link> atau cmd install <namaFile> <kode>", event.threadID);
        }
      } catch (error) {
        api.sendMessage(`Gagal mengunduh atau menyimpan file: ${error.message}`, event.threadID);
      }
    }

    // Delete Logika
    else if (awal === pilih[1]) {
      try {
        if (namaFile && namaFile.endsWith('.js')) {
          const filePath = path.join(folderPath, namaFile);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            api.sendMessage(`File ${namaFile} berhasil dihapus.`, event.threadID);
          } else {
            api.sendMessage(`File ${namaFile} tidak ditemukan.`, event.threadID);
          }
        } else {
          api.sendMessage("Gunakan format: cmd delete <namaFile>.js", event.threadID);
        }
      } catch (error) {
        api.sendMessage(`Gagal menghapus file: ${error.message}`, event.threadID);
      }
    }

    // Load Logika
    else if (awal === pilih[2]) {
      try {
        if (namaFile && namaFile.endsWith('.js')) {
          const filePath = path.resolve(folderPath, namaFile);
          if (fs.existsSync(filePath)) {
            delete require.cache[require.resolve(filePath)];
            require(filePath);
            api.sendMessage(`File ${namaFile} berhasil di-load.`, event.threadID);
          } else {
            api.sendMessage(`File ${namaFile} tidak ditemukan.`, event.threadID);
          }
        } else {
          api.sendMessage("Gunakan format: cmd load <namaFile>.js", event.threadID);
        }
      } catch (error) {
        api.sendMessage(`Gagal memuat file: ${error.message}`, event.threadID);
      }
    }

    // LoadAll Logika
    else if (awal === pilih[3]) {
  try {
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js')); 
    let loadedFiles = [];

    files.forEach(file => { 
      const filePath = path.resolve(folderPath, file);
      console.log(`Memeriksa file: ${filePath}`);
      if (fs.existsSync(filePath)) {
        delete require.cache[require.resolve(filePath)];
        require(filePath);
        loadedFiles.push(file);
      } else {
        console.warn(`File ${file} tidak ditemukan di folder ${folderPath}`);
      }
    });

    if (loadedFiles.length > 0) {
      api.sendMessage(`File yang berhasil di-load: ${loadedFiles.join(', ')}`, event.threadID);
    } else {
      api.sendMessage("Tidak ada file .js yang ditemukan untuk di-load.", event.threadID);
    }
  } catch (error) {
    api.sendMessage(`Gagal memuat semua file: ${error.message}`, event.threadID);
  }
    } else {
      api.sendMessage("Perintah tidak valid. Gunakan salah satu dari: install, delete, load, loadAll", event.threadID);
    }
  }
};
