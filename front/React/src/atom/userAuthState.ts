import { atom } from "recoil";
import { RegisterUser } from "../types/User";

export const userAuthState = atom<RegisterUser>({
  key: "userAuthState",
  default: {
    user_id: 0,
    username: "",
    password: 0,
    access_token: "",
    access_Token: "",
    refreshToken: "",
  },
});
