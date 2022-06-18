import { Configuration, OpenAIApi } from "openai";
import Discord from "discord.js";
import dotenv from "dotenv";
dotenv.config({ path: "./process.env" });

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}); //open_ai api key

const openai = new OpenAIApi(configuration);

client.on("message", (msg) => {
  if (msg.author.bot) return;
  if (msg.content.includes("openai") === true) {
    async function getResponse(param) {
      const response = await openai
        .createCompletion({
          model: "text-davinci-002",
          prompt: param,
          temperature: 0.7,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        })
        .then((response) => {
          msg.channel.send(param + response.data.choices[0].text);
        });
    }
    getResponse(msg.content);
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.CLIENT_TOKEN); //login bot using token
