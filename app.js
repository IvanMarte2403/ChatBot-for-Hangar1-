const { createBot, createProvider, createFlow, addKeyword, CoreClass } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const ChatGPTClass = require('./chatgpt.class');
const createBOTGPT = async ({provider, database}) => {
    return new ChatGPTClass(database, provider);
};

//  const flujoHola = addKeyword(['hola' , 'buenas']).addAnswer('Hola, ¿en qué puedo ayudarte?').addAnswer('¿Cómo es tu email', {capture:true},  (ctx) => {
//     console.log('Aqui viene el email: ', ctx.body)
//  })
// .addAnswer('Gracias por la información')



const main = async () => {
    const adapterDB = new MockAdapter() 
    // const adapterFlow = createFlow([flujoHola])
    const adapterProvider = createProvider(BaileysProvider);

    createBOTGPT({
        // flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
