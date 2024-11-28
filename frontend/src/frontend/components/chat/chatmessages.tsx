import React from 'react';

interface ChatMessagesProps {
  messages: { type: 'user' | 'bot'; text: string }[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="p-4 h-60 overflow-y-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
        >
          <div
            className={`inline-block px-4 py-2 rounded-lg ${
              message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;