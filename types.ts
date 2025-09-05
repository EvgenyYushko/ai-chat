export enum Role {
    USER = 'user',
    MODEL = 'model',
}

export interface Message {
    role: Role;
    text: string;
}

// Reverted to the simple structure for the user's proxy.
export interface GeminiProxyRequest {
    contents: Array<{
        parts: Array<{ text: string }>;
    }>;
}

export interface GeminiProxyResponse {
    candidates: Array<{
        content: {
            parts: Array<{ text: string }>;
            role: string;
        };
    }>;
}