
import React from 'react';
import { Message, Role } from '../types';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';

interface MessageBubbleProps {
    message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === Role.USER;

    const bubbleClasses = isUser
        ? 'bg-blue-600 rounded-br-none'
        : 'bg-gray-700 rounded-bl-none';
    
    const containerClasses = isUser
        ? 'justify-end'
        : 'justify-start';

    const avatar = isUser ? <UserIcon /> : <BotIcon />;

    return (
        <div className={`flex items-end space-x-3 ${containerClasses}`}>
            {!isUser && (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                   {avatar}
                </div>
            )}
            <div
                className={`max-w-lg lg:max-w-xl px-4 py-3 rounded-2xl text-white ${bubbleClasses}`}
            >
                <p className="whitespace-pre-wrap break-words">{message.text}</p>
            </div>
            {isUser && (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                    {avatar}
                </div>
            )}
        </div>
    );
};
