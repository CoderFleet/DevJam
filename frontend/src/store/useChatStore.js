import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { axiosInstance } from "../lib/axios";

// Created a basic zustand store for chats
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  currentUser: null, // Initially
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const usersFromBackend = await axiosInstance.get("/messages/users");
      set({ users: usersFromBackend.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const messagesFromBackend = await axiosInstance.get(
        `/messages/${userId}`
      );
      // console.log("Here are messages: ", messagesFromBackend.data.data);
      set({ messages: messagesFromBackend.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { currentUser, messages } = get();
    // console.log("yoyoyoy", currentUser);
    try {
      const res = await axiosInstance.post(
        `/messages/send/${currentUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateOnRealtime: () => {
    const { currentUser } = get();
    if (!currentUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if(newMessage.senderId !== currentUser._id) return;
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },

  removeUpdateOnRealtime: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setCurrentUser: (currentUser) => set({ currentUser }),
}));
