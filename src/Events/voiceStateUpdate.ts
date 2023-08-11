import ExtendedClient from "../Client";
import { Event } from "../Interfaces";
import { ChannelType, NewsChannel, VoiceState } from 'discord.js'

function removeCustomChannel(oldState: VoiceState) {
    if (oldState.channel != null) {
        if ((oldState.channel.name.toLowerCase().endsWith("room") && !oldState.channel.name.toLowerCase().endsWith('new room')) && oldState.channel.members.size == 0) {
            if (oldState.channel.deletable) oldState.channel.delete()
            else console.error(`Something went wrong trying to delete channel: ${oldState.channel.name} (${oldState.channelId})`);
        }
    }
}

export const event: Event = {
    data: {
        name: 'voiceStateUpdate',
        description: 'Event fired when user changes voice state'
    },
    run: async (client: ExtendedClient, oldState: VoiceState, newState: VoiceState) => {
        removeCustomChannel(oldState);
        if (newState.channel != null) {
            var newParent: string = newState.channel.parentId;
            if (newState.channel.name.toLowerCase().includes('new room')) {
                var existingChannel = newState.guild.channels.cache.find(c => c.name.startsWith(newState.member.user.username));
                if (existingChannel) {
                    newState.member.voice.setChannel(existingChannel.id);
                    return;
                }
                var username: string = (newState.member.user.username.endsWith('s')) ? `${newState.member.user.username}'` : `${newState.member.user.username}'s`;
                var newChannel = await newState.guild.channels.create({ name: `${username} Room`, type: ChannelType.GuildVoice, parent: newParent })
                newChannel.permissionOverwrites.create(newState.member.user, { Connect: true, KickMembers: true, DeafenMembers: true, ViewChannel: true});
                newChannel.permissionOverwrites.create(newState.guild.roles.everyone, { Connect: false });
                newChannel.send(`||<@${newState.member.id}>||\n\`>>help room\` for room commands,\nReminder that rooms are locked by default \`>>unlock\` to make it public.`)
                newState.member.voice.setChannel(newChannel.id);
            }
        }
    }
}