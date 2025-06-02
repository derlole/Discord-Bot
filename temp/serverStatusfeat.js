const os = require("os");
const osu = require("os-utils");

const CHANNEL_ID = "1353007524709929032";
const WEB_SERVER_URL = "https://lires.de";

async function getFetch() {
    const { default: fetch } = await import('node-fetch');  // Dynamischer Import von 'node-fetch'
    return fetch;
  }


  async function getServerInfo() {
    const fetch = await getFetch();  // Abrufen des 'fetch' Moduls
    return new Promise((resolve) => {
      osu.cpuUsage(async (cpuUsage) => {
        const ramUsage = ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;
        const uptime = os.uptime() / 3600;
        const wlanStatus = os.networkInterfaces()["wlan0"] ? "🟢 Aktiv" : "🔴 Aus";
  
        let webStatus = "🔴 Offline";
        try {
          const response = await fetch(WEB_SERVER_URL);
          if (response.ok) webStatus = `🟢 Erreichbar (${response.status})`;
        } catch (error) {}
  
        resolve(` 
          📡 **Server Status Update**
          🖥 **CPU-Nutzung**: ${(cpuUsage * 100).toFixed(2)}%
          🖥 **RAM-Nutzung**: ${ramUsage.toFixed(2)}%
          ⏳ **Uptime**: ${uptime.toFixed(2)} Stunden
          📶 **WLAN**: ${wlanStatus}
          🌍 **Webserver**: ${webStatus}
        `);
      });
    });
  }

async function sendServerStatus(client) {
  const channel = await client.channels.fetch(CHANNEL_ID);
  if (!channel) {
    console.error("❌ Channel nicht gefunden!");
    return;
  }

  const message = await getServerInfo();
  channel.send(message);
}

function scheduleTask(client) {
  setInterval(async () => {
    const now = new Date();
    if ([8, 18].includes(now.getHours()) && now.getMinutes() === 0) {
      await sendServerStatus(client);
    }
  }, 60 * 1000);
}

module.exports = { scheduleTask };
