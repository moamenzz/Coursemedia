import { create } from "zustand";

interface MyLearningStore {
  activeTab: "my-courses" | "wishlist";
  setActiveTab: (activeTab: MyLearningStore["activeTab"]) => void;
}

const useMyLearningStore = create<MyLearningStore>((set) => ({
  activeTab: "my-courses",
  setActiveTab: (activeTab) => set({ activeTab }),
}));

export default useMyLearningStore;
