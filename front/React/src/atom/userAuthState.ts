import { atom } from "recoil";
import { RegisterUser } from "../types/User";

export const userAuthState = atom<RegisterUser>({
  key: "userAuthState",
  default: {
    user_id: 0,
    username: "",
    access_token: "",
    access_Token: "",
    refreshToken: "",
  },
});
