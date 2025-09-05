
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { LoadingSpinner } from './LoadingSpinner';

interface ChatWindowProps {
    messages: Message[];
    isLoading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    return (
        <div className="flex-1 p-4 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-4">
                {messages.map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))}
                {isLoading && (
                    <div className="flex justify-start items-end space-x-3">
                         <div className="w-10 h-10 flex-shrink-0"></div>
                         <div className="flex items-center justify-center p-3 bg-gray-700 rounded-lg">
                            <LoadingSpinner />
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};
