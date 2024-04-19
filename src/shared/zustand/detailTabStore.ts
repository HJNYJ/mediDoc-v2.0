import { TabState } from "@/types";
import { create } from "zustand";

const useDetailTabStore = create<TabState>()((set) => ({
  selectedTab: "default",
  selectTab: (tab: "default" | "image" | "review") => set({ selectedTab: tab })
}));

export default useDetailTabStore;
