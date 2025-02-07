// import { FaRegMessage } from "react-icons/fa6";
import { TbMessage } from "react-icons/tb";


function NoChatSelected() {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce">
              <TbMessage className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Chat Area</h2>
        <p className="text-base-content/60">
          Select a user from sidebar to start chatting
        </p>
      </div>
    </div>
  );
}

export default NoChatSelected;
