module.exports = {
  config: {
    nama: "r",
    penulis: "Range",
    kuldown: 10,
    peran: 0,
    tutor: "Bot akan restart otomatis setelah hitungan mundur 2 jam."
  },

  Alya: async function ({api, event}) {
    const waktuMundur = 2 * 60 * 60 * 1000;
    let sisaWaktu = waktuMundur;

    api.sendMessage(
      `⏳ Bot akan restart otomatis dalam 2 jam.`,
      event.threadID
    );

    const interval = setInterval(() => {
      sisaWaktu -= 30 * 60 * 1000; 
      const jam = Math.floor(sisaWaktu / (60 * 60 * 1000));
      const menit = Math.floor((sisaWaktu % (60 * 60 * 1000)) / (60 * 1000));

      if (sisaWaktu > 0) {
        api.sendMessage(
          `⏰ Bot akan restart dalam ${jam} jam ${menit} menit.`,
          event.threadID
        );
      }
    }, 30 * 60 * 1000); 

    setTimeout(() => {
      clearInterval(interval); 
      api.sendMessage(
        "🔄 Waktu habis! Bot sedang melakukan restart...",
        event.threadID,
        () => {
          console.log("🔄 Restarting bot...");
          process.exit(0); 
        }
      );
    }, waktuMundur);
  }
};
