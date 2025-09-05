
import React, { useState } from 'react';
import { SendIcon } from './icons/SendIcon';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 md:space-x-4 bg-gray-800 p-2 rounded-xl border border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 transition-shadow duration-200">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none resize-none p-2 max-h-40"
                rows={1}
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-full bg-blue-600 text-white disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
            >
                <SendIcon />
            </button>
        </form>
    );
};
