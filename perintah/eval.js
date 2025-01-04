module.exports = {
  config: { 
    nama: "eval", 
    penulis: "Range", 
    kuldown: 10,   
    peran: 2,      
    tutor: "<kosong/tag>"  
  }, 
  Alya: async function ({ api, event, args }) {
    function output(msg) {
      if (typeof msg == "number" || typeof msg == "boolean" || typeof msg == "function")
        msg = msg.toString();
      else if (msg instanceof Map) {
        let text = `Map(${msg.size}) `;
        text += JSON.stringify(mapToObj(msg), null, 2);
        msg = text;
      }
      else if (typeof msg == "object")
        msg = JSON.stringify(msg, null, 2);
      else if (typeof msg == "undefined")
        msg = "undefined";

      api.sendMessage(msg, event.threadID);  
    }
    
    function mapToObj(map) {
      const obj = {};
      map.forEach(function (v, k) {
        obj[k] = v;
      });
      return obj;
    }
    
    if (args[0] && args[0].startsWith("out(")) {
      const code = args.join(" ").slice(4, -1); 
      
      try {
        const result = eval(code); 
        output(result); 
      } catch (err) {
        api.sendMessage("❌ Terjadi kesalahan: " + err.message, event.threadID);
      }
    } else {
      api.sendMessage("❌ Format perintah yang kamu gunakan salah! Gunakan: /eval out(<kode yang ingin dijalankan>)", event.threadID);
    }
  }
};
