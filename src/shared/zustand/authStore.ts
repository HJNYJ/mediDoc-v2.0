import { create } from "zustand";
import { produce } from "immer";

const useAuthStore = create()((set) => ({
  user: {
    isLoggedIn: false,
    email: ""
  },
  changeLoggedIn: (isSession: boolean) =>
    set(
      produce((state) => {
        state.user.isLoggedIn = isSession;
      })
    )
}));

export default useAuthStore;
