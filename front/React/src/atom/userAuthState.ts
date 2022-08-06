import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { RegisterUser } from "../types/User";

const { persistAtom } = recoilPersist();

export const userAuthState = atom<RegisterUser>({
  key: "userAuthState",
  default: {
    user_id: 0,
    username: "",
    password: 0,
    accessToken: "",
    refreshToken: "",
  },
  effects_UNSTABLE: [persistAtom],
});
