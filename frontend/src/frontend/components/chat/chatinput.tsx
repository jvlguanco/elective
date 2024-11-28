import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="p-2 border-t border-gray-200 flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about PLM..."
        className="flex-grow px-3 py-2 border rounded-md focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 ml-2 rounded-md"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;