interface ChatMessagesProps {
  messages: { type: 'user' | 'bot'; text: string }[];
  loading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, loading }) => {
  return (
    <div className="p-4 h-72 overflow-y-auto">
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
      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-600"></div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;