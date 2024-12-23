module.exports = {
  config: {
    name: "eval",
    penulis: "Hady Zen",
    kuldown: 6,
    peran: 2,
  },

  Alya: async function ({ api, event, args }) {
  try { 
    eval(args.join(" "));
  } catch (p) {
    api.sendMessage("Error: " + p.message, event.threadID, event.messageID);
  }
 }
};
