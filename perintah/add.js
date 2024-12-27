module.exports = {
config: { 
  nama: "add",
  penulis: "Hady Zen", 
  peran: 1,
  kuldown: 10,
  tutor: "<id>"
}, 

Alya: async function (api, event, args) { 
 const id = args[0];

  if (text) {
     try { 
      api.addUserToGroup(id, event.threadID);
     } catch (e) {
       console.log(e);
     }
  } else {
    return api.sendMessage("Masukkan id nya bodo", event.threadID, event.messageID);
  }
}
};
