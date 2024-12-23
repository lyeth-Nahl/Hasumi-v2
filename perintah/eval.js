module.exports = {
  config: {
    name: "eval",
    penulis: "Hady Zen",
    kuldown: 6,
    peran: 2,
  },

  Alya: async function ({ api, event, args }) {
    // Pastikan ada argumen untuk dieksekusi
    if (!args || args.length === 0) {
      return api.sendMessage("Harap masukkan kode yang akan dieksekusi.", event.threadID, event.messageID);
    }

    try {
      // Gabungkan argumen menjadi satu string dan jalankan dengan eval
      const code = args.join(" ");
      let result = eval(code); // Hati-hati menggunakan eval

      // Jika hasil eval adalah objek atau array, kita bisa mengubahnya menjadi string
      if (typeof result === "object") {
        result = JSON.stringify(result, null, 2);
      }

      // Kirimkan hasil eksekusi kode ke pengguna
      api.sendMessage(`Hasil:\n${result}`, event.threadID, event.messageID);
    } catch (error) {
      // Tangani error yang terjadi saat eksekusi eval
      api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
    }
  }
};
