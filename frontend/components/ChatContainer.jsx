import { useChatStore } from "../src/store/useChatStore.js";
import { useAuthStore } from "../src/store/useAuthStore.js";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

function ChatContainer() {
  // StackOverflow + AI
  function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  const {
    messages,
    getMessages,
    isMessagesLoading,
    currentUser,
    updateOnRealtime,
    removeUpdateOnRealtime,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(currentUser._id);
    updateOnRealtime();

    return () => removeUpdateOnRealtime();
  }, [currentUser._id, getMessages, updateOnRealtime, removeUpdateOnRealtime]);

  useEffect(() => {
    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
  }, [messages]);

  if (isMessagesLoading) {
    return <div className="">Loading...</div>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}>
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic ||
                        "https://avatarfiles.alphacoders.com/375/375542.png"
                      : currentUser.avatar ||
                        "https://avatarfiles.alphacoders.com/375/375542.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
