const MAC_ADDRESS = '18:C0:4D:C3:AB:7A'; // MAC-Adresse deines PCs
const BROADCAST_IP = '192.168.178.255'; // Broadcast-Adresse deines Netzwerks
const PORT = 9; // Standard-WOL-Port
const wol = require('wake_on_lan');
module.exports = async (message) => {
    
    if (message.content !== "!wol" || message.author.username !== "derlole6807" || message.channel.id !== "1353007524709929032") return;
    console.log(message.author.username );
    console.log(message.channel.id);
     wol.wake(MAC_ADDRESS, { address: BROADCAST_IP, port: PORT }, function(error) {
            if (error) {
                console.error('Fehler beim Senden des WOL-Pakets:', error);
                message.reply('⚠️ Fehler beim Starten des PCs.');
            } else {
                console.log('WOL-Paket gesendet!');
                message.reply('✅ PC wird gestartet (WOL gesendet).');
            }
        });
}
