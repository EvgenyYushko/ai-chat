
import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex space-x-1.5">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce animation-delay-400"></div>
        </div>
    );
};
