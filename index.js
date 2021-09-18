const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'Незнакомец'}!\nВоспользуйся нашем меню для навигации) Рекомендкю команду: /test`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('test', async (ctx)=> {
    try{
    await ctx.replyWithHTML('<b>Наше предложение:</b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('Кнопка 1', 'btn_1'), Markup.button.callback('Кнопка 2', 'btn_2')],
            [Markup.button.callback('Конпка 3', 'btn_3')]
        ]
    ))

} catch(e){
    console.error(e)
}
})

function addActrionBot(name, src, text){
    bot.action(name, async (ctx) => {
        try{
            await ctx.answerCbQuery()
            if (src !== false){
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview : true
            })
        } catch(e){
            console.error(e)
        }
    })
    
}
addActrionBot('btn_1', './img/1.jpg', text.text1)
addActrionBot('btn_2', false, text.text2)
addActrionBot('btn_3', './img/2.jpg', text.text3)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))