import { useChatStore } from "../src/store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Navbar from "../components/Navbar";

const Chat = () => {
  const { currentUser } = useChatStore();

  return (
    <>
      <Navbar />
      <div className="max-h-screen bg-base-200">
        <div className="flex items-center justify-center pt-8 pb-8 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar />

              {!currentUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
