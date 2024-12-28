module.exports = {
  config: {
   nama: "rand",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 0,
    tutor: "<pilihan>, <pilihan>"
  },

  Alya: async function (api, event, args) { 
   const hadi = args.join(" ");
   const itsuki = hadi.split(",");
 if (!hadi || !itsuki) {
   return api.sendMessage('Berikan setidaknya dua rentang angka.', event.thteadID, event.messageID)
 }
const rand = Math.floor(Math.random() * itsuki.length);
const pilihan = itsuki[rand];
api.sendMessage(`Alya lebih milih ${pilihan}`, event.threadID, event.messageID);
 }
};
