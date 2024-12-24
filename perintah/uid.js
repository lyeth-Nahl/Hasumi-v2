module.exports = {
  config: { 
    nama: "uid", 
    kuldown: 10
  }, 
  Alya: async function(api, event, args) {
    if (args[0]) {
          const { mentions } = event;
	    let p = ''; 
		for (const id in mentions) { 
            hadi += `${mentions[id].replace("@", "")}: ${id}\n`;
	}
      api.sendMessage(hadi, event.threadID, event.messageID);
    } else { 
      api.sendMessage(event.senderID, event.threadID, event.messageID);
    }
  }
};
