const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
    name: "bing",
    version: "1.0",
    credits: "RAHUL",
    hasPermssion: 0,
    description: "Generate images by Dalle-3 AI",
    commandCategory: "download",
    usages: "[text] \nJamon [A 17/18/19 years old boy/girl watching football match on tv and written Rahul and 69 on the back of his Dress , 4k]",
    cooldowns: 5
  };

module.exports.run = async function ({ api, event, args }) {
  const prompt = event.messageReply?.body.split("dalle")[1] ||  args.join(" ");
  if (!prompt) {
   return api.sendMessage("❌| Wrong Formet .✅ | Use 17/18 years old boy/girl watching football match on tv and written RAHUL and 69 on the back of his Dress , 4k",event.threadID,event.messageID);
  }
    try {
      const w = await api.sendMessage("𝙥𝙡𝙚𝙖𝙨𝙚 𝙬𝙞𝙩𝙝𝙚 𝙥𝙧𝙤𝙘𝙚𝙨𝙨𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙞𝙢𝙖𝙜𝙚 \n\n𝙠𝙝𝙖𝙣 𝙧𝙖𝙝𝙪𝙡 𝙧𝙠💞", event.threadID);

const response = await axios.get(`https://rest-api-zegp.onrender.com/dipto/dalle?prompt=${prompt}&key=dipto008&cookies=1KGl_2jo3YQ5ZbR8NH0PZMBCM_p73wPr4O_m0uZ6BvGdz_ORKhJjFVQvtyWzefNLRbeXLk5CUobYfqoXOqfbXGLDOlqdqfu687Td74urgKwDAgy5YUfASoziuTbM1UxAK01v4isn9HyNkG-_2Eu68fdXn1goLzqj9ZfVDUdYghYmOEMZv2derX_YuYCimGux0qVkS_4Bmz0xRXqxTmuNx2w`)
      const data = response.data.imgUrls;
      if (!data || data.length === 0) {
        api.sendMessage("Empty response or no images generated.",event.threadID,event.messageID);
      }
      const diptoo = [];
      for (let i = 0; i < data.length; i++) {
        const imgUrl = data[i];
        const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'dalle', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        diptoo.push(fs.createReadStream(imgPath));
      }
      await api.unsendMessage(w.messageID);
      await api.sendMessage({
  body: `𝙨𝙪𝙘𝙚𝙨𝙨𝙛𝙪𝙡 𝙮𝙤𝙪𝙧 𝙞𝙢𝙖𝙜𝙚 \n\n𝙠𝙝𝙖𝙣 𝙧𝙖𝙝𝙪𝙡 𝙧𝙠💞`,
        attachment: diptoo
      },event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      await api.sendMessage(`Generation failed!\nError: ${error.message}`,event.threadID, event.messageID);
    }
  };
