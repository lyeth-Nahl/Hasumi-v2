module.exports = {
  config: {
    name: "eval",
    penulis: "Hady Zen",
    kuldown: 6,
    peran: 2,
  },

  Alya: async function ({ api, event, args }) {
    function output(msg) {
      if (typeof msg === "number" || typeof msg === "boolean" || typeof msg === "function") {
        msg = msg.toString();
      } else if (msg instanceof Map) {
        let text = `Map(${msg.size}) `;
        text += JSON.stringify(mapToObj(msg), null, 2);
        msg = text;
      } else if (typeof msg === "object") {
        msg = JSON.stringify(msg, null, 2);
      } else if (typeof msg === "undefined") {
        msg = "undefined";
      }

      api.sendMessage(msg, event.threadID); 
    }

    // Helper function for converting Map to Object
    function mapToObj(map) {
      const obj = {};
      map.forEach((v, k) => {
        obj[k] = v;
      });
      return obj;
    }

    // Join the arguments for eval
    const cmd = `
    (async () => {
      try {
        let result = ${args.join(" ")}; 
        output(result);
      } catch (err) {
        api.sendMessage("An error occurred while executing eval: " + err.message, event.threadID);
      }
    })()`;

    try {
      eval(cmd); 
    } catch (err) {
      api.sendMessage("Failed to run eval: " + err.message, event.threadID);
    }
  }
};
