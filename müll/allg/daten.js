const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: String,
    content: String,
});
const Message = mongoose.model('Message', messageSchema);

module.exports = async (message) => {
    (async () => {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
    })
    if(message.author.username ==='derlole' && message.guild.id === '1079807641896890488') {
        try {
            const messages = await Message.find({name: message.author.username});
            const contents = await Message.find({content: message.content});
            if (contents[0]){
                if (messages && message.content === contents[0].content){
                    message.channel.send('Das hast schonmal geschrieben');
                    return;
                }
            }
            else {
            const newMessage = new Message({
                name: message.author.username,
                content: message.content,
            });
            await newMessage.save();
            console.log('Saved message to database');
            }
        }
        catch (err) {
            console.log(err);
        }
    }   
} 