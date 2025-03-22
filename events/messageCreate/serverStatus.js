const os = require("os");
const osu = require("os-utils");
const si = require('systeminformation');
const pm2 = require('pm2');  

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
**System Information:**

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
      //const wlanStatus = os.networkInterfaces()["eth0"] ? "🟢 Aktiv" : "🔴 Aus";
      if(os.networkInterfaces()["wlan0"] ) {
        wlanStatus = "🟢 Aktiv"
        netDevice = os.networkInterfaces()["wlan0"]
      }
      else if(os.networkInterfaces()["eth0"] ) {
        wlanStatus = "🟢 Aktiv"
        netDevice = os.networkInterfaces()["eth0"]
      }
      else if(os.networkInterfaces()["wlp58s0"] ) {
        wlanStatus = "🟢 Aktiv"
        netDevice = os.networkInterfaces()["wlp58s0"]
      }
      else {
        wlanStatus = "🔴 Aus"
      };

      let webStatus = "🔴 Offline";
      let data = {ip: "N/A"};
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
      resolve(`
        **Server Status Update**
        
        **CPU Nutzung**: ${(cpuUsage * 100).toFixed(2)}%
        **RAM Nutzung**: ${ramUsage.toFixed(2)}%
        **Netzwerk**: ${wlanStatus} an Adresse: ${netDevice[0].address} (öffentlich: ${data.ip})
        
        **Uptime**: ${uptime.toFixed(2)} Stunden
        
        ---
        
        **System Information:**
        ${sysInfo}
        
        ---
        
        **PM2-Instanzen:**
        ${pm2Info}
        
        ---
        
        **Webserver**: ${webStatus}
        `);
        
    });
  });
}

async function sendServerStatus(message) {
  const channel = message.channel;  // Channel, in dem die Nachricht empfangen wurde
  if (channel.id !== CHANNEL_ID) {
    console.error("❌ Channel nicht gefunden!");
    return;
  }
  const messageText = await getServerInfo();
  channel.send(messageText);
}

module.exports = async(message) => {
    // Überprüfen, ob die Nachricht "status" enthält (kann beliebig angepasst werden)
    if (message.content === "serverStatus") {
      await sendServerStatus(message);
    }
};
