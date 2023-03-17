// zustand store for messages
import { create } from "zustand";
import { Chat, CourseModule, Message } from "../types";

const useChatRoomStore = create<ChatRoomStore>((set) => ({
  chats: [],
  chatMessages: [],
  chatId: "",
  courseModule: undefined,

  setCourseModule: (courseModule, chats) =>
    set(() => {
      return { courseModule, chats };
    }),
  addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
  deleteChat: (chatId) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId),
    })),
  toggleMessageFavorite: (messageId: Message["id"]) => {
    set((state) => ({
      chatMessages: state.chatMessages.map((message) => {
        if (message.id === messageId) {
          return { ...message, isSaved: !message.isSaved };
        }
        return message;
      }),
    }));
  },
  clearChats: () => set(() => ({ chats: [] })),
  selectChat: (chatId, chatMessages) => set(() => ({ chatId, chatMessages })),
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  setChatMessages: (messages) => set(() => ({ chatMessages: messages })),
  clearChatMessages: () => set(() => ({ chatMessages: [] })),
}));

interface ChatRoomStore {
  chats: Chat[] | [];
  addChat: (chat: Chat) => void;
  chatId: string;
  courseModule: CourseModule | undefined;
  setCourseModule: (courseModule: CourseModule, chats: Chat[]) => void;
  chatMessages: Message[];
  addChatMessage: (message: Message) => void;
  toggleMessageFavorite: (messageId: Message["id"]) => void;
  setChatMessages: (messages: Message[]) => void;
  deleteChat: (chatId: string) => void;
  clearChats: () => void;
  clearChatMessages: () => void;
  selectChat: (chatId: string, chatMessages: Message[]) => void;
}

export default useChatRoomStore;
