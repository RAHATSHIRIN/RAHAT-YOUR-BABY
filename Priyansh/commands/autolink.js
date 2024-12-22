const axios = require("axios");
const fs = require("fs-extra");
const tinyurl = require("tinyurl");
const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`);
  return base.data.api;
};
module.exports.config = {
  name: "autolink",
  version: "1.0.",
  hasPermssion: 0,
  credits: "RAHAT",
  description: "Fb Vid Downloader",
  commandCategory: "other",
  category: "others",
  usags: "fb video link",
  usePrefix: true,
  prefix: true,
  cooldowns: 2,
  dependencies: {

    "tinyurl": "",
    "fs-extra": "",
  },
};

const onStart = () => {};
const onChat = async ({ api, event }) => {
  let dipto = event.body ? event.body : "", ex, cp;
  try {
    if (
      dipto.startsWith("https://vt.tiktok.com") ||
      dipto.startsWith("https://www.tiktok.com/") ||
      dipto.startsWith("https://www.facebook.com") ||
      dipto.startsWith("https://www.instagram.com/") ||
      dipto.startsWith("https://youtu.be/") ||
      dipto.startsWith("https://youtube.com/") ||
      dipto.startsWith("https://x.com/") ||
      dipto.startsWith("https://youtube.com/")
      dipto.startsWith("https://www.instagram.com/p/") ||
      dipto.startsWith("https://pin.it/") ||
      dipto.startsWith("https://twitter.com/") ||
      dipto.startsWith("https://vm.tiktok.com") ||
      dipto.startsWith("https://fb.watch")
    ) {
      api.setMessageReaction("⌛", event.messageID, true);
      const w = await api.sendMessage("𝐖𝐚𝐢𝐭 𝐁𝐛𝐲 <😘", event.threadID);
      const response = await axios.get(`${await baseApiUrl()}/alldl?url=${encodeURIComponent(dipto)}`);
      const d = response.data;
      if (d.result.includes(".jpg")) {
        ex = ".jpg";
        cp = "Here's your Photo <😘";
      } else if (d.result.includes(".png")) {
        ex = ".png";
        cp = "Here's your Photo <😘";
      } else if (d.result.includes(".jpeg")) {
        ex = ".jpeg";
        cp = "Here's your Photo <😘";
      } else {
        ex = ".mp4";
        cp = d.cp;
      }
      const path = __dirname + `/cache/video${ex}`;
      fs.writeFileSync(path, Buffer.from((await axios.get(d.result, { responseType: "arraybuffer" })).data, "binary"));
      const shortUrl = await tinyurl.shorten(d.result);
      api.setMessageReaction("✅", event.messageID, true);
      api.unsendMessage(w.messageID);
      await api.sendMessage({
          body: `${d.cp || null}\n✅ | Link: ${shortUrl || null}`,
          attachment: fs.createReadStream(path),
        }, event.threadID, () => fs.unlinkSync(path), event.messageID
      )
    }
  } catch (err) {
    api.setMessageReaction("❌", event.messageID, true);
    console.log(err);
    api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
  }
};

module.exports = {
  config,
  onChat,
  onStart,
  run: onStart,
  handleEvent: onChat,
};
