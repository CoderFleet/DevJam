import { useState } from "react";
import { useChatStore } from "../src/store/useChatStore";
import { LuSend } from "react-icons/lu";
// import toast from "react-hot-toast";

const MessageInput = () => {
  const [messageText, setMessageText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messageText.trim() === "") return;

    try {
      await sendMessage({
        text: messageText.trim(),
      });
      // Clear form
      setMessageText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          {/* <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
          />
          <button
            type="button"
            className="hidden sm:flex btn btn-circle text-zinc-400"
            onClick={() => fileInputRef.current?.click()}>
            <LuImage size={20} />
          </button> */}
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={messageText.trim() === ""}>
          <LuSend size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
