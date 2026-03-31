import { EmbedBuilder } from 'discord.js';

export function successEmbed(title: string, description: string): EmbedBuilder {
  return new EmbedBuilder().setColor(0x2ecc71).setTitle(title).setDescription(description).setTimestamp();
}

export function errorEmbed(title: string, description: string): EmbedBuilder {
  return new EmbedBuilder().setColor(0xe74c3c).setTitle(title).setDescription(description).setTimestamp();
}
