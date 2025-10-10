const MAC_ADDRESS_MAIN = '18:C0:4D:C3:AB:7A';
const MAC_ADDRESS_RED = 'd8:9e:f3:09:fe:32'; 
const MAC_ADDRESS_BLUE = '50:9a:4c:4b:c5:56'; 
const BROADCAST_IP = '192.168.178.255';
const PORT = 9;
const wol = require('wake_on_lan');
module.exports = async (message) => {
    if (message.author.bot || message.channel.id !== "1079388144031506494"){
        if (message.author.bot || message.author.username !== "derlole6807" || message.channel.id !== "1353007524709929032") return;
        console.log(message.author.username );
        console.log(message.channel.id);
        if (message.content == "!wol-main" ) {
            wol.wake(MAC_ADDRESS_MAIN, { address: BROADCAST_IP, port: PORT }, function(error) {
                if (error) {
                    console.error('Fehler beim Senden des WOL-Pakets:', error);
                    message.reply('⚠️ Fehler beim Starten des PCs.');
                } else {
                    console.log('WOL-Paket gesendet!');
                    message.reply('✅ PC wird gestartet (WOL gesendet).');
                }
            });
        }else if (message.content == "!wol-red" ) {
            wol.wake(MAC_ADDRESS_RED, { address: BROADCAST_IP, port: PORT }, function(error) {
                if (error) {
                    console.error('Fehler beim Senden des WOL-Pakets:', error);
                    message.reply('⚠️ Fehler beim Starten des PCs.');
                } else {
                    console.log('WOL-Paket gesendet!');
                    message.reply('✅ PC wird gestartet (WOL gesendet).');
                }
            });
        }else if (message.content == "!wol-blue" ) {
            wol.wake(MAC_ADDRESS_BLUE, { address: BROADCAST_IP, port: PORT }, function(error) {
                if (error) {
                    console.error('Fehler beim Senden des WOL-Pakets:', error);
                    message.reply('⚠️ Fehler beim Starten des PCs.');
                } else {
                    console.log('WOL-Paket gesendet!');
                    message.reply('✅ PC wird gestartet (WOL gesendet).');
                }
            });
        }
    } else if(message.content.toLowerCase().includes("start_mc_server")) {
        wol.wake(MAC_ADDRESS_RED, { address: BROADCAST_IP, port: PORT }, function(error) {
            if (error) {
                console.error('Fehler beim Senden des WOL-Pakets:', error);
                message.reply('⚠️ Fehler beim Starten des Servers.');
            } else {
                console.log('WOL-Paket gesendet!');
                message.reply('✅ Server wird gestartet (WOL gesendet).');
            }
        });
    }
    
}
