import { Telegraf } from 'telegraf'
import Groq from 'groq-sdk'
import config from 'config'

const bot = new Telegraf(config.get('TELEGRAM_BOT'))
const groq = new Groq({apiKey: (config.get('GROQ_API_KEY'))})

let messages = [];

bot.on('text', async (ctx) => {
    messages.push({ role: 'user', content: ctx.message.text });
    if (messages.length > 6) {
        messages = messages.slice(-6);
    }
    try {
        const response = await groq.chat.completions.create({
            model: 'llama3-70b-8192',
            messages: messages,
            temperature: 0
        });
        const replyMessage = response.choices[0].message.content;
        await ctx.reply(replyMessage);
        messages.push({ role: 'assistant', content: replyMessage });
    } catch (error) {
        console.error('Error:', error);
    }
});

bot.launch();
