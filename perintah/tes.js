module.exports = {
  config: { 
    nama: "tes", 
    kuldown: 1
  }, 
  Alya: async function(api, event) {
    // Mengambil informasi thread secara asinkron
const threadInfo = await new Promise((resolve, reject) => {
    api.getThreadInfo(event.threadID, (err, info) => {
        if (err) return reject(err); // Menangani error
        resolve(info); // Mengembalikan data jika sukses
    });
});

// Mengambil daftar admin dari informasi thread
const adminList = threadInfo.adminIDs;


const message = `${adminList.join("\n\n")}`;
api.sendMessage(message, event.threadID);
  }
};
