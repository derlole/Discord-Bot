const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

module.exports = (message, instance) => {
  if (message.channel.id === '1079807642639290510') {
  
  
  if (!regex.test(message.content)) return;
   {
    console.log("lolrofl")
     const currentTime = new Date();
  const [hours, minutes] = message.content.split(':');
  const reminderTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hours, minutes, 0, 0);
  const timeUntilReminder = reminderTime - currentTime;
     console.log(timeUntilReminder)
  }
}
}