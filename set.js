const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUhma25EY0R6TmFMVnAwMktJMXZ3RVdvY0FMd1lZV25US1Z4cVlUN1ZuRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMTAzTGxCeFRSYzJlV24vYzBXUVJhR0xrM2pTM3liK28vbytiZzh4SFcwWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Q2FLMnZnSnVIMmoxUDJxeXBQOERVUXdvSTg1Z0I1YXIrUU53VTArTkhvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5ekNWZ2FGa1daYkR1ZncwR3loaFZMTUhwN0hoQmk3TEhRT2NPN2hLYmhrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlJN1pkc3lKK2U2RnhqTUZOQTkyMlJnM1VEdnkvcGl6ZUpQTGhYY3FDSDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9yZnRKcXBmQ1haYXJvL2k5aCtBcXhkUE9SbXFzaDJ3VmRtSGNDZnVsVjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEFxcjFldkZrQUhlYmtCUXFWeCtreVJCaFE2NHIrRTdpVlhobVB3Y0xHOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL2xHNTVRSWdZQUhnT3dXREJza1pKYjRzQzNvUXNZeDNnT0tCNzY3ZTZudz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFYQVIwN0U0Ukd1dUZKUUZCdkxxaHdJekpPTXNlcFZPdm55d0E3elhRNFNxOUh4MjM5eEFBK0FqcXVzdUFueWlvSUJtSWw2ZUU3cWo0dDVKa0dDTENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjgsImFkdlNlY3JldEtleSI6Ikdub0lqQm8yOTExaFJmMWYwcm0vM3lWd1Voa1cyTVUvRTFBRlZseG53Sk09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU2NzQzOTA4NDQ0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhDNjQ2NzZEMkZEQzNFRERCQTkwODUzRDVGQjMyM0M2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTYzODA3OTF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1Njc0MzkwODQ0NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyNzE3MTFBNTlBQkZDRTNFMUNBMTlBQUQ4OERBQTc4OSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU2MzgwODAzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJCQVFWUlJMRCIsIm1lIjp7ImlkIjoiMjU2NzQzOTA4NDQ0OjlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyMjc5Mzk0NTExNjgzNTo5QGxpZCIsIm5hbWUiOiJkZW5peHBybzI1NiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS0hZNU1nQ0VNVDh3TVVHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoielNMMS9GU1BaZ0dZTzZXY2pyRnh6cm9YenBNWFZKTDJxSjZDdEpjM25HQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZDRjWnpnb2hwME10SnZ3NGwzTS9ZczhnZFB2TW1pZTZoMmdSSW9GYjlXVnVRdzdqMnBjcDZickxSOEFQQ2RqOVJwWVU2L2xSMTlyb2xIamFMb1ovQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6IjRtN0RGSW9hSkkvaElFRUVsWTZ4MnlwRXdnZEFWU1A3MUlMVUlCUW5QSjlDaTQvcysvQ0gySTkzTDRGbVJicUF4aXo4TUJVeThxNkxVc2NyZkdkOENRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU2NzQzOTA4NDQ0OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYzBpOWZ4VWoyWUJtRHVsbkk2eGNjNjZGODZURjFTUzlxaWVnclNYTjV4ZyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU2MzgwNzUzLCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdyRyJ9',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/QUEEN-DIANA/DIANA-XMD',
    OWNER_NAME : process.env.OWNER_NAME || "𝗗𝗜𝗔𝗡𝗔 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "18492823944",
    DEV : process.env.DEV || "𝗗𝗜𝗔𝗡𝗔 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/v1or1h.jpg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/wh3gx1.jpg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By DIANA-XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG : process.env.ANTI_TAG || "on",
    ANTI_BAD : process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP : process.env.ANTI_SHARE_GROUP || "on",
    ANTI_LINK_GROUP : process.env.ANTI_LINK_GROUP || "on",
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VbA8bWXKmCPZ2EFhAA0Y",
    WEBSITE :process.env.GURL || "https://queen-diana-pair.onrender.com",
    CAPTION : process.env.CAPTION || "𝐃𝐈𝐀𝐍𝐀 ~ 𝐗𝐌𝐃",
    BOT : process.env.BOT_NAME || '𝐃𝐈𝐀𝐍𝐀 ~ 𝐗𝐌𝐃',
    MODE: process.env.PUBLIC_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
