const CHANNEL_ID = '1414704845524435064';

function scheduleTaskPeople(client) {
    const getRandomHour = () => Math.floor(Math.random() * (21 - 8) + 8); // 8–20 Uhr
    const getRandomMinute = () => Math.floor(Math.random() * 60);

    function scheduleNextMessages() {
        const now = new Date();
        let times = [];

        // Zwei verschiedene Uhrzeiten erzeugen
        while (times.length < 2) {
            const hour = getRandomHour();
            const minute = getRandomMinute();
            if (!times.some(t => t.hour === hour && t.minute === minute)) {
                times.push({ hour, minute });
            }
        }

        console.log("Geplante Zeiten:", times);

        times.forEach(({ hour, minute }) => {
            const next = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                hour,
                minute,
                0,
                0
            );
            if (next < now) next.setDate(next.getDate() + 1); // falls Zeit schon vorbei ist → morgen

            const delay = next - now;
            setTimeout(() => {
                client.channels.cache
                    .get(CHANNEL_ID)
                    ?.send('Pray for those you love. <@738480351046795305> <@702427586822930493>');
            }, delay);
        });

        // Um Mitternacht neu planen
        const tomorrow = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0, 0, 5 // 00:00:05 Uhr
        );
        const msUntilTomorrow = tomorrow - now;
        setTimeout(scheduleNextMessages, msUntilTomorrow);
    }

    scheduleNextMessages();
}

module.exports = (instance, client) => {
    scheduleTaskPeople(client);
};
