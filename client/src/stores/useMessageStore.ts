import { create } from "zustand";

interface MessageStoreProps {
  selectedConversation: string;
  setSelectedConversation: (selectedConversation: string) => void;
}

const useMessageStore = create<MessageStoreProps>((set) => ({
  selectedConversation: "",
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
}));

export default useMessageStore;
