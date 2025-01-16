module.exports = {
  config: {
    nama: "pay",
    penulis: "Range",
    kuldown: 10,
    peran: 0,
    tutor: "pay <fakeID penerima> <jumlah>"
  },

  Alya: async function ({ api, event, args, Syntora.getData, Syntora.setData }) {
    try {
      const { senderID, threadID, messageID } = event;
      const targetFakeID = parseInt(args[0]);
      const amount = parseInt(args[1]);
      if (!targetFakeID || !amount) return api.sendMessage("Format tidak valid. Gunakan:\npay <fakeID penerima> <jumlah>", threadID, messageID);
      if (isNaN(targetFakeID) || isNaN(amount) || amount <= 0) return api.sendMessage("Harap masukkan ID dan jumlah yang valid. Jumlah harus lebih dari 0.",threadID,messageID);
      const senderData = await Syntora.getData(senderID);
      if (!senderData || !senderData.money) return api.sendMessage("Data Anda tidak ditemukan. Pastikan Anda memiliki akun yang valid.", threadID, messageID);
      if (senderData.money < amount) return api.sendMessage(`Anda tidak memiliki cukup uang. Saldo Anda: ${senderData.money}.`, threadID, messageID);
      const allUsers = await getData();
      const receiverEntry = Object.entries(allUsers).find(
        ([realID, userData]) => userData.fakeID === targetFakeID
      );
      if (!receiverEntry) {
        return api.sendMessage(
          "ID penerima tidak ditemukan. Pastikan ID yang Anda masukkan benar.",
          threadID,
          messageID
        );
      }
      const [receiverRealID, receiverData] = receiverEntry;
      const userInfo = await Syntora.getData(receiverRealID);
      const receiverName = userInfo.name || "Pengguna";
      const senderName = senderData.name || "Pengguna";

      senderData.money -= amount;
      receiverData.money = (receiverData.money || 0) + amount;

      await Syntora.setData(senderID, senderData);
      await Syntora.setData(receiverRealID, receiverData);
      api.sendMessage(`Berhasil mengirim ${amount} money ke ${receiverName} dengan ID: ${targetFakeID}.`, threadID, messageID);
      api.sendMessage(`Anda menerima ${amount} money dari ${senderName} dengan ID ${senderID}. Saldo Anda sekarang: ${receiverData.money}.`, receiverRealID);
    } catch (error) {
      console.error("Terjadi kesalahan dalam proses pembayaran:", error.message);
      return api.sendMessage(
        "Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi nanti.",
        event.threadID,
        event.messageID
      );
    }
  }
};
