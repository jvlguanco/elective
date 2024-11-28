import React, { useState } from 'react';
import ChatInput from './chatinput';
import ChatMessages from './chatmessages';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (userMessage: string) => {
    const newMessages = [...messages, { type: 'user', text: userMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch('http://localhost:5000/chat/cohere-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const { reply } = await response.json();
      setMessages([...newMessages, { type: 'bot', text: reply }]);
    } catch (error) {
      setMessages([...newMessages, { type: 'bot', text: 'Sorry, there was an error.' }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="bg-white shadow-lg rounded-lg w-80">
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
            <h2 className="text-lg">PLM Chatbot</h2>
            <button onClick={toggleChatbot} className="text-xl">
              ×
            </button>
          </div>
          <ChatMessages messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <button
          onClick={toggleChatbot}
          className="text-white rounded-full shadow-lg"
        >
          <img src='/images/chat_icon.jpg' alt="Chat Icon" className="w-16 h-16 rounded-full" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;