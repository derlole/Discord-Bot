module.exports = (message,instance) => {
  if (!message.content.startsWith('!')) return;

  // Aufteilen der Nachricht in Bestandteile
  const args = message.content.slice('!'.length).trim().split(/ +|:/);
  const time = args[0];
  const request = args[1];
  const user = args[2];
  const importance = args[3];

  if (!time || !request || !user || !importance) return;
console.log("alles vorhanden")
  const regex = /^([01]\d|2[0-3]).([0-5]\d)$/;
  if (!regex.test(time)) return;
    console.log("lolrofl")
  const currentTime = new Date();
  const [hours, minutes] = time.split('.');
  const reminderTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hours, minutes, 0, 0);
  const timeUntilReminder = reminderTime - currentTime;
  console.log(timeUntilReminder)
  setTimeout(() => {
    const userObj = message.client.users.cache.find(u => u.username === user);
    if (userObj) {
      userObj.send(`Erinnerung: ${request} (Wichtigkeit: ${importance})`);
    } else {
      console.log(`User "${user}" nicht gefunden.`);
    }
  }, timeUntilReminder);
};
