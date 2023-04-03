const { CommandType } = require("wokcommands");

module.exports = {
  description: "Give an user a Role",
  type: CommandType.LEGACY,
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<user> <role ID>",

  callback: async ({ message, args, guild }) => {
    const [username, roleId] = args;
    let roleName = message.guild.roles.cache.find(role => role.name === roleId);
    const role = message.guild.roles.cache.get(roleName.id);
    const userName = username.replace(/-/g, " ")
    let member = await guild.members.fetch({ query: userName });
    if (!role) return "Please specify a valid role ID.";
    
    if (!member) return "Please specify a valid user.";
    console.log(member.GuildMember.user)
    await message.member.roles.add(role);

    return `Gave ${member.user.username} the role ${role.name}.`;
  },
};
