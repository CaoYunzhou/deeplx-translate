import { Ai } from './vendor/@cloudflare/ai.js';

export default {
    async fetch(request, env) {
        if (request.method === 'GET') {
            return new Response('support language: [english, chinese, french, spanish, arabic, russian, german, japanese, portuguese, hindi],\nexample: curl -X POST -H "Content-Type: application/json" -d \'{"text":"Hello world","source_lang":"en","target_lang":"chinese"}\' https://deeplx.aivvm.com');
        }

        if (request.method === 'POST') {
            const ai = new Ai(env.AI);
            const requestJson = await request.json();
            if (!requestJson.text || !requestJson.source_lang || !requestJson.target_lang) {
                return new Response('Error: Missing parameters in the request.', { status: 400 });
            }
            const inputs = {
                text: requestJson.text || 'hello world',
                source_lang: requestJson.source_lang || 'en',
                target_lang: requestJson.target_lang || 'chinese'
            };
            const response = await ai.run('@cf/meta/m2m100-1.2b', inputs);

            return new Response(JSON.stringify({ inputs, response }), { headers: { 'content-type': 'application/json' } });
        }
    }
};