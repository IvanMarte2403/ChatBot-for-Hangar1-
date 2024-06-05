const { createBot, createProvider, createFlow, addKeyword, CoreClass } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const ChatGPTClass = require('./chatgpt.class');
const createBOTGPT = async ({provider, database}) => {
    return new ChatGPTClass(database, provider);
};

const flujoHola = addKeyword(['hola' , 'buenas'])
    .addAnswer(async (ctx) => {
        // Hacer una solicitud a ChatGPT
        const response = await this.openai.sendMessage(ctx.body);

        // Utilizar la respuesta de ChatGPT como respuesta del bot
        return response.text;
    })
    .addAnswer(async (ctx) => {
        console.log('Aqui viene el email: ', ctx.body)

        // Hacer una solicitud a ChatGPT
        const response = await this.openai.sendMessage(ctx.body);

        // Utilizar la respuesta de ChatGPT como respuesta del bot
        return response.text;
    })
    .addAnswer('Gracias por la información')



const main = async () => {
    const adapterDB = new MockAdapter() 
    const adapterFlow = createFlow([flujoHola])
    const adapterProvider = createProvider(BaileysProvider);

    createBOTGPT({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
