import React, { useState } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { Message, Role } from './types';
import { generateContentWithProxy } from './services/geminiService';

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: Role.MODEL,
            text: "Здравствуйте! Я ваш ИИ-помощник. Чем я могу вам помочь?",
        },
    ]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendMessage = async (inputText: string) => {
        if (!inputText.trim() || isLoading) return;

        const newUserMessage: Message = { role: Role.USER, text: inputText };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setIsLoading(true);
        setError(null);

        try {
            const responseText = await generateContentWithProxy(updatedMessages);
            const newModelMessage: Message = { role: Role.MODEL, text: responseText };
            setMessages(prevMessages => [...prevMessages, newModelMessage]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(errorMessage);
            const errorBotMessage: Message = { 
                role: Role.MODEL, 
                text: `Sorry, I encountered an error: ${errorMessage}` 
            };
            setMessages(prevMessages => [...prevMessages, errorBotMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
            <header className="bg-gray-800 shadow-md p-4 flex items-center justify-center border-b border-gray-700">
                <h1 className="text-xl md:text-2xl font-bold text-gray-200">Gemini Proxy Chat</h1>
            </header>
            <main className="flex-1 overflow-hidden flex flex-col">
                <ChatWindow messages={messages} isLoading={isLoading} />
            </main>
            <footer className="p-2 md:p-4 bg-gray-900 border-t border-gray-700">
                 {error && (
                    <div className="text-center text-red-400 mb-2 text-sm p-2 bg-red-900/50 rounded-md max-w-2xl mx-auto">
                        {error}
                    </div>
                )}
                <div className="max-w-3xl mx-auto">
                    <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                </div>
            </footer>
        </div>
    );
};

export default App;
