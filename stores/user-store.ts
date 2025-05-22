import { UserData } from "@/types/auth";

import { create } from "zustand";

type authStore = {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
};

const authStore = create<authStore>(() => ({
  user: null,
  setUser: (user: UserData | null) => {
    authStore.setState({ user });
  },
}));

export default authStore;
