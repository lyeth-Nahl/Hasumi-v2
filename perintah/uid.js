module.exports = {
  config: { 
    nama: "uid", 
    kuldown: 10
  }, 
  Alya: async function(api, event, args) {
    if (args[0]) {
          const { mentions } = event;
		for (const id in mentions)
			const p = `${mentions[id].replace("@", "")}: ${id}\n`;
      api.sendMessage("nih: " + p, event.threadID, event.messageID);
    } else { 
      api.sendMessage(event.senderID, event.threadID, event.messageID);
    }
  }
};
