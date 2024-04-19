import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
  user: {
    isLoggedIn: boolean;
    email: string;
  };
}

interface Action {
  changeLoggedIn: (isSession: boolean) => void;
}

const useAuthStore = create<State & Action>()(
  immer((set) => ({
    user: {
      isLoggedIn: false,
      email: ""
    },
    changeLoggedIn: (isSession) =>
      set((state) => {
        state.user.isLoggedIn = isSession;
      })
  }))
);

export default useAuthStore;
