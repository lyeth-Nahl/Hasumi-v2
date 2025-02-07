module.exports = {
  config: {
    nama: "z",
    penulis: "Range",
    kuldown: 6,
    peran: 0,
    tutor: ""
  },

  Alya: async function ({ api, event, getData, getAllData }) {
    try {
      const { senderID, threadID, messageID } = event;
      const userData = await getData(senderID);
      const allUserData = await getAllData();

      if (!allUserData || Object.keys(allUserData).length === 0) {
        return api.sendMessage("Tidak ada data user yang tersedia.", threadID);
      }

      const sortedUsers = Object.values(allUserData).sort((a, b) => a.fakeID - b.fakeID);
      const jumlahUser = sortedUsers.length;
      const pesan = `Jumlah user terdaftar: ${jumlahUser}`;
      api.sendMessage(pesan, threadID, messageID);
    } catch (error) {
      console.error("Error fetching user data:", error);
      api.sendMessage("Terjadi kesalahan dalam mengambil data user.", event.threadID, event.messageID);
    }
  }
};
