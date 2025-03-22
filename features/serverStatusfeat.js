const os = require("os");
const osu = require("os-utils");
const si = require('systeminformation');
const pm2 = require('pm2');  
const { EmbedBuilder } = require('discord.js');

const CHANNEL_ID = "1353007524709929032";
const WEB_SERVER_URL = "https://lires.de";

async function getFetch() {
  const { default: fetch } = await import('node-fetch');  
  return fetch;
}

async function getSystemInfo() {
  try {
    const cpu = await si.cpu();
    const cpuTemp = await si.cpuTemperature();
    const memory = await si.mem();
    const disk = await si.fsSize();
    const os = await si.osInfo();
    const network = await si.networkInterfaces();

    return(`
**CPU**: ${cpu.manufacturer} ${cpu.brand}
**CPU Temperatur**: ${cpuTemp.main ? cpuTemp.main : "Nicht verfügbar"} °C
**RAM**: ${(memory.total / (1024 ** 3)).toFixed(2)} GB
**Festplatte**: ${(disk[0].used / (1024 ** 3)).toFixed(2)} GB verwendet von ${(disk[0].size / (1024 ** 3)).toFixed(2)} GB
**Betriebssystem**: ${os.distro} ${os.release}

**Netzwerk-Interfaces:**
${network.map((iface) => `  - ${iface.iface}: ${iface.ip4 || 'Nicht verbunden'}`).join('\n')}
`);
  } catch (error) {
    console.error('Fehler beim Abrufen von Systeminformationen:', error);
  }
}

async function getPm2Info() {
  return new Promise((resolve, reject) => {
    pm2.connect((err) => {
      if (err) {
        reject('Fehler beim Verbinden zu PM2');
        return;
      }

      pm2.list((err, processList) => {
        if (err) {
          reject('Fehler beim Abrufen der PM2-Instanzen');
          return;
        }

        const pm2Info = processList.map((proc) => {
          return `
  **${proc.name}**:
    - Status: ${proc.pm2_env.status}
    - CPU Nutzung: ${(proc.monit.cpu).toFixed(2)}%
    - RAM Nutzung: ${(proc.monit.memory / (1024 ** 2)).toFixed(2)} MB
  `;
        }).join('\n');

        resolve(pm2Info);
      });
    });
  });
}

async function getServerInfo() {
  const fetch = await getFetch();  // Abrufen des 'fetch' Moduls
  return new Promise((resolve) => {
    osu.cpuUsage(async (cpuUsage) => {
      const ramUsage = ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;
      const uptime = os.uptime() / 3600;
      let wlanStatus = "🔴 Aus";
      let netDevice = {};

      if (os.networkInterfaces()["wlan0"]) {
        wlanStatus = "🟢 Aktiv";
        netDevice = os.networkInterfaces()["wlan0"];
      } else if (os.networkInterfaces()["eth0"]) {
        wlanStatus = "🟢 Aktiv";
        netDevice = os.networkInterfaces()["eth0"];
      } else if (os.networkInterfaces()["wlp58s0"]) {
        wlanStatus = "🟢 Aktiv";
        netDevice = os.networkInterfaces()["wlp58s0"];
      }

      let webStatus = "🔴 Offline";
      let data = { ip: "N/A" };
      try {
        const response = await fetch(WEB_SERVER_URL);
        if (response.ok) webStatus = `🟢 Erreichbar (${response.status})`;
      } catch (error) {}
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        data = await response.json();
      } catch (error) {
        console.error("Fehler beim Abrufen der öffentlichen IP-Adresse:", error);
      }

      const sysInfo = await getSystemInfo();
      const pm2Info = await getPm2Info();
      
      // Hier verwenden wir den EmbedBuilder anstelle von MessageEmbed
      const embed = new EmbedBuilder()
        .setColor('#3498db')  // Setze eine Farbe für den Embed
        .setTitle('Server Status Update')
        .addFields(
          { name: 'CPU Nutzung', value: `${(cpuUsage * 100).toFixed(2)}%`, inline: true },
          { name: 'RAM Nutzung', value: `${ramUsage.toFixed(2)}%`, inline: true },
          { name: 'Netzwerk', value: `${wlanStatus} an Adresse: ${netDevice[0].address} (öffentlich: ${data.ip})`, inline: false },
          { name: 'Uptime', value: `${uptime.toFixed(2)} Stunden`, inline: true },
          { name: 'Webserver', value: webStatus, inline: true }
        )
        .addFields(  // Hier füge Systeminformationen und PM2-Instanzen als weitere Felder hinzu
          { name: 'System Information', value: sysInfo, inline: false },
          { name: 'PM2-Instanzen', value: pm2Info, inline: false }
        );

      resolve(embed);
    });
  });
}

async function sendServerStatus(client) {
  const channel = await client.channels.fetch(CHANNEL_ID);
  if (!channel) {
    console.error("❌ Channel nicht gefunden!");
    return;
  }

  const embed = await getServerInfo();
  channel.send({ embeds: [embed] });
}

function scheduleTask(client) {
  setInterval(async () => {
    const now = new Date();
    console.log(`Aktuelle Uhrzeit: ${now.getHours()}:${now.getMinutes()}`);
    if ([7, 17].includes(now.getHours()) && now.getMinutes() === 0) {
      await sendServerStatus(client);
    }
  }, 60 * 1000);
}

module.exports = (instance, client) => {
  scheduleTask(client);
}
