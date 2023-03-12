module.exports = (message,instance) => {
  if (!message.content.startsWith('!')) return;

    const args = message.content.slice('!'.length).trim().split(/ +|:/);
    const datetime = args[0].split('.');
    const date = datetime[0];
    const month = datetime[1];
    const year = datetime[2];
    const time = args[1];
    const request = args[2];
    const user = args[3];
    const importance = args[4];

  if (!date || !month || !year || !time || !request || !user || !importance) return;
  console.log("alles da")

    const dateRegex = /^(0?[1-9]|[1-2]\d|3[0-1])\.(0?[1-9]|1[0-2])\.\d{4}$/;
    const timeRegex = /^([01]\d|2[0-3]).([0-5]\d)$/;
      if (!timeRegex.test(time)) return;
      if (!dateRegex.test(args[0])) return;
          console.log("passt")
        const reminderTime = new Date(year, month - 1, date, ...time.split('.'), 0);
        const timeUntilReminder = reminderTime - new Date();
        console.log(timeUntilReminder);
  
    setTimeout(() => {
      const userObj = message.client.users.cache.find(u => u.username === user);
      if (userObj) {
        userObj.send(`Erinnerung: ${request} (Wichtigkeit: ${importance})`);
      } else {
        console.log(`User "${user}" nicht gefunden.`);
    }
  }, timeUntilReminder);
};

