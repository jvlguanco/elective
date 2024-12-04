import React, { useState } from 'react';
import ChatInput from './chatinput';
import ChatMessages from './chatmessages';
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: import.meta.env.VITE_COHERE_API_KEY,
});

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (userMessage: string) => {
    const newMessages = [...messages, { type: 'user', text: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    const plmPrompt = `
      You are a knowledgeable AI chatbot specifically created to answer questions about the Pamantasan ng Lungsod ng Maynila (PLM). 
      Your goal is to provide accurate, concise, and friendly answers about PLM's history, programs, campus life, student services, 
      admission process, achievements, and other related topics. 
      If a question is not related to PLM, politely reply: 
      "I'm here to answer questions about Pamantasan ng Lungsod ng Maynila only. Please ask a question related to PLM."
      
      User: ${userMessage}
      Bot:
    `;

    try {
      const response = await cohere.generate({
        model: 'command-xlarge',
        prompt: plmPrompt,
        temperature: 0.7,
      });

      const botReply = response.generations?.[0]?.text.trim() || 
        "I'm here to answer questions about Pamantasan ng Lungsod ng Maynila only. Please ask a question related to PLM.";
      
      setMessages([...newMessages, { type: 'bot', text: botReply }]);
    } catch (error: any) {
      setMessages([
        ...newMessages, 
        { type: 'bot', text: "Sorry, I encountered an error while processing your request. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="bg-white shadow-xl rounded-lg border border-gray-300">
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center rounded-t-lg">
            <h2 className="text-lg font-semibold">PLM Chatbot</h2>
            <button onClick={toggleChatbot} className="text-xl font-bold">
              ×
            </button>
          </div>
          <ChatMessages messages={messages} loading={loading} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <button
          onClick={toggleChatbot}
          className="text-white rounded-full shadow-lg flex items-center justify-center w-16 h-16"
        >
          <img src="/images/chat_icon.jpg" alt="Chat Icon" className="w-16 h-16 rounded-full" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;