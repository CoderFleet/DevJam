import { RxCross1 } from "react-icons/rx";
import { useAuthStore } from "../src/store/useAuthStore";
import { useChatStore } from "../src/store/useChatStore";

const ChatHeader = () => {
  const { currentUser, setCurrentUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={currentUser.avatar || "https://avatarfiles.alphacoders.com/375/375542.png"} alt={currentUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{currentUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(currentUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setCurrentUser(null)}>
          <RxCross1 />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;