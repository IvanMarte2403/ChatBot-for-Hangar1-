require('dotenv').config();

const {CoreClass} = require('@bot-whatsapp/bot')

class ChatGPTClass extends CoreClass{
    queue = [];
    optionGPT = {model: "gpt-3.5-turbo"};
    openai = undefined;

    constructor(_database, _provider){
        super(null, _database, _provider);
        this.init().then();
    }

    // Hace la implementación de la libreria 
    init = async () => {
        const { ChatGPTAPI } = await import('chatgpt');
        console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY); // Imprime la clave de API


    this.openai = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
});
    };

   handleMsg = async (ctx) => {
    const {from, body} = ctx; 
    const completion = await this.openai.sendMessage(body); // Cambia 'sentMessage' a 'sendMessage'

    this.queue.push(completion);
    
    const parseMessage ={
        ...completion,
        answer: completion.text,
    };

    this.sendFlowSimple([parseMessage], from);
};

}

module.exports  =  ChatGPTClass;