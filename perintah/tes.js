module.exports = {
  config: { 
    nama: "tes", 
    kuldown: 1
  }, 
  Alya: async function(api, event) {
    const threadInfo = await new Promise((resolve, reject) => {
        api.getThreadInfo(event.threadID, (err, info) => {
            if (err) reject(err);
            else resolve(info);
        });
    });

    const adminList = threadInfo.adminIDs;

    const adminIDs = adminList.map(admin => admin.id);

    const message = `${adminIDs.join("\n")}`;

    api.sendMessage(message, event.threadID, event.messageID);
  }
};
