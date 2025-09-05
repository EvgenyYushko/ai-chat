import { Message, GeminiProxyRequest, GeminiProxyResponse, Role } from '../types';

export const generateContentWithProxy = async (history: Message[]): Promise<string> => {
    // Reverted to the user's external proxy service as requested.
    const API_KEY = 'AIzaSyDCpnSKTcxoceA_cXw1i7MdwLgOArqowq4';//process.env.API_KEY;

    // This check is crucial. The build process replaces the key with a placeholder if it's not set in the environment.
    // if (!API_KEY || API_KEY === 'UNUSED_PLACEHOLDER_FOR_API_KEY') {
    //     throw new Error("API_KEY is not configured. Please set the API_KEY secret in your application's environment variables.");
    // }

    const proxyUrl = `https://google-services-kdg8.onrender.com/api/gemini/generate?key=${API_KEY}`;
    
    // The user's proxy expects a single prompt.
    // We format the conversation history into a single string to maintain context.
    const firstUserMessageIndex = history.findIndex(msg => msg.role === Role.USER);
    const conversationHistory = firstUserMessageIndex !== -1 ? history.slice(firstUserMessageIndex) : [];

    if (conversationHistory.length === 0) {
        // This case should not happen in the current app flow, but it's a good safeguard.
        throw new Error("Cannot generate content from an empty or bot-only history.");
    }

    const prompt = conversationHistory
        .map(msg => `${msg.role}: ${msg.text}`)
        .join('\n\n');

    // This is the simple request body format the user's proxy expects.
    const requestBody: GeminiProxyRequest = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        const response = await fetch(proxyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let detailedErrorMessage = errorText || response.statusText;
            try {
                const errorBody = JSON.parse(errorText);
                detailedErrorMessage = errorBody?.error?.message || JSON.stringify(errorBody.error) || errorBody.error || detailedErrorMessage;
            } catch (e) {
                // Not a JSON error, use the raw text.
            }
            throw new Error(`Proxy server returned an error: ${response.status}. ${detailedErrorMessage}`);
        }

        const data: GeminiProxyResponse = await response.json();
        
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (typeof text !== 'string') {
            console.error("Invalid response from proxy:", data);
            throw new Error("Invalid response structure from proxy server.");
        }

        return text;

    } catch (error) {
        console.error("Error calling proxy service:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error occurred while contacting the proxy server.");
    }
};