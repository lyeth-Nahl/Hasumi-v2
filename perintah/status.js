module.exports = {
  config: { 
    nama: "status",  
    penulis: "Range", 
    kuldown: 6,
    peran: 0,
    tutor: ""
  }, 

  Alya: async function ({ api, event, getData }) {
    const senderID = event.senderID; 
    try {
      const data = await getData(senderID);  

      if (!data) {
        api.sendMessage("Data tidak ditemukan.", event.threadID);
        return;
      }
      const name = data.name;
      const fakeID = data.fakeID || 'Tidak ditemukan';
      const exp = data.exp || 0;
      const money = data.money || 0;

      const statusMessage = `*Status Pengguna:*\nName: ${name}\nID: ${fakeID}\nExp: ${exp}\nMoney: ${money}`;

      api.sendMessage(statusMessage, event.threadID, event.messageID);
      
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      api.sendMessage("Terjadi kesalahan saat mengambil data status.", event.threadID);
    }
  }
};
