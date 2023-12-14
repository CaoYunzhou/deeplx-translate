import { Ai } from './vendor/@cloudflare/ai.js';

export default {
    async fetch(request, env) {
        let base_tips = 'support language: [english, chinese, french, spanish, arabic, russian, german, japanese, portuguese, hindi],\nexample: curl -X POST -H "Content-Type: application/json" -d \'{"text":"Hello world","source_lang":"en","target_lang":"chinese"}\' https://deeplx.aivvm.com'
        if (request.method === 'GET') {
            return new Response(base_tips);
        }

        if (request.method === 'POST') {
            try {
                const ai = new Ai(env.AI);
                const requestJson = await request.json();
                if (!requestJson.text || !requestJson.source_lang || !requestJson.target_lang) {
                    return new Response('Error: Missing parameters in the request.', { status: 400 });
                }
                const inputs = {
                    text: requestJson.text || 'hello world',
                    source_lang: requestJson.source_lang.toLowerCase() || 'en',
                    target_lang: requestJson.target_lang.toLowerCase() || 'chinese'
                };
                const response = await ai.run('@cf/meta/m2m100-1.2b', inputs);
                // 判断 response 中 translated_text 是否为空
                if (!response.translated_text) {
                    return new Response(JSON.stringify({ detail: "Translation failed." }), { status: 400, headers: { 'content-type': 'application/json' } });
                }

                // 获取当前时间戳作为 id
                const timestamp = Date.now();

                // 修改响应数据的格式，将 id 改为时间戳
                const newResponse = {
                    code: 200,
                    id: timestamp,
                    data: response.translated_text,
                    alternatives: []
                };

                return new Response(JSON.stringify(newResponse), { headers: { 'content-type': 'application/json' } });
            } catch (error) {
                // return new Response('Error: ' + error.message, { status: 400 });
                return new Response(base_tips, { status: 400 })
            }
        }
    }
};
