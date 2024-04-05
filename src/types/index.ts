export type TabState = {
  selectedTab: "default" | "image" | "review";
  selectTab: (tab: "default" | "image" | "review") => void;
};

export type TabList = Pick<TabState, "selectedTab">;
