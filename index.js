import { Ai } from './vendor/@cloudflare/ai.js';

// Function to translate text using Cloudflare AI
async function translateText(request, environment) {
    const cloudflareAI = new Ai(environment.AI);
    const requestJson = await request.json();

    if (!requestJson.text || !requestJson.source_lang || !requestJson.target_lang) {
        return new Response('Error: Missing parameters in the request.', { status: 400 });
    }

    const translationInputs = {
        text: requestJson.text,
        source_lang: requestJson.source_lang.toLowerCase(),
        target_lang: requestJson.target_lang.toLowerCase()
    };

    const translationResponse = await cloudflareAI.run('@cf/meta/m2m100-1.2b', translationInputs);

    if (!translationResponse.translated_text) {
        return new Response(JSON.stringify({ detail: "Translation failed." }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    return { translationInputs, translationResponse };
}

// Fetch function for handling requests
async function handleRequest(request, environment) {
    const baseTips = 'Support languages: [english, chinese, french, spanish, arabic, russian, german, japanese, portuguese, hindi],\nExample: curl -X POST -H "Content-Type: application/json" -d \'{"text":"Hello world","source_lang":"en","target_lang":"chinese"}\' https://deeplx.aivvm.com';

    if (request.method === 'GET') {
        return new Response(baseTips);
    }

    if (request.method === 'POST') {
        try {
            const result = await translateText(request, environment);

            // Check if result is a Response object
            if (result instanceof Response) {
                return result;
            }

            const timestamp = Date.now();

            if (request.url.endsWith('translate')) {
                const formattedResponse = {
                    code: 200,
                    id: timestamp,
                    data: result.translationResponse.translated_text,
                    alternatives: []
                };
                return new Response(JSON.stringify(formattedResponse), { headers: { 'content-type': 'application/json' } });
            } else {
                return new Response(JSON.stringify({ inputs: result.translationInputs, response: result.translationResponse }), { headers: { 'content-type': 'application/json' } });
            }
        } catch (error) {
            return new Response(baseTips, { status: 400 });
        }
    }
}

export default {
    async fetch(request, environment) {
        return handleRequest(request, environment);
    }
};
