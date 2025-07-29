import { create } from "zustand";

interface MessageStoreProps {
  selectedConversation: string;
  selectedMessage: string;
  setSelectedConversation: (selectedConversation: string) => void;
  setSelectedMessage: (selectedMessage: string) => void;
}

const useMessageStore = create<MessageStoreProps>((set) => ({
  selectedConversation: "",
  selectedMessage: "",
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  setSelectedMessage: (selectedMessage) => set({ selectedMessage }),
}));

export default useMessageStore;
