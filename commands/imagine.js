const { AttachmentBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { generateImage } = require("../src/generateImage")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("imagine")
        .addStringOption((option) =>
            option
                .setName("prompt")
                .setRequired(true)
                .setDescription("Let's create an image for your imaginations.")
        )
        .setDescription("Let's create an image for your imaginations."),

    async execute(interaction) {
        const prompt = interaction.isButton()
            ? interaction.customId
            : interaction.options.getString("prompt")

        await interaction.deferReply();

        const { file } = await generateImage(
            interaction.id,
            prompt
        );
        await interaction.editReply({
            embeds: [
                {
                    title: prompt,
                    image: {
                        url: "attachment://image.jpg"
                    }
                }
            ],
            files: [new AttachmentBuilder(file, "image.jpg")],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(prompt)
                        .setLabel("Try again.")
                        .setStyle(ButtonStyle.Primary)
                )
            ]
        })
    },
};