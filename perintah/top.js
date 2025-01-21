module.exports = { 
  config: { 
    nama: "top",
    penulis: "Range", 
    kuldown: 10,
    peran: 0,
    tutor: "money or exp"
  }, 

  Alya: async function ({ api, event, args, getAllData, getData }) {
    const awal = args[0];
    const allUser = await getAllData();
    
    if (awal === "money") {
      const allUserStats = Object.entries(allUser)
        .filter(([userId, userData]) => userData) 
        .map(([userId, userData]) => ({
          userId,
          money: userData.money
        }));
      if (!allUserStats) return api.sendMessage("Belum ada user yang terdaftar di database.", event.threadID, event.messageID);
      const sortedUsers = allUserStats.sort((a, b) => b.money - a.money);
      const topList = await Promise.all(sortedUsers.slice(0, 10).map(async (user, index) => {
        const userInfo = await getData(user.userId);
        const nama = userInfo.name || "Unknown";
        return `${index + 1}. ${nama} - Money: ${user.money}`;
      }));
      api.sendMessage(topList.join("\n"), event.threadID, event.messageID);
    } else if (awal === "exp") {
      const allUserStats = Object.entries(allUser)
        .filter(([userId, userData]) => userData) 
        .map(([userId, userData]) => ({
          userId,
          exp: userData.exp
        }));
      if (!allUserStats) return api.sendMessage("Belum ada user yang terdaftar di database.", event.threadID, event.messageID);
      const sortedUsers = allUserStats.sort((a, b) => b.exp - a.exp);
      const topList = await Promise.all(sortedUsers.slice(0, 10).map(async (user, index) => {
        const userInfo = await getData(user.userId);
        const nama = userInfo.name || "Unknown";
        return `${index + 1}. ${nama} - Exp: ${user.exp}`;
      }));
      api.sendMessage(topList.join("\n"), event.threadID, event.messageID);
    } else {
      api.sendMessage("Perintah tidak dikenali. Gunakan 'money' atau 'exp'.", event.threadID, event.messageID);
    }
  }
};
