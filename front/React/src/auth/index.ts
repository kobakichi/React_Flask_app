import { createAuthProvider } from "react-token-auth";

type Session = { access_Token: string; refreshToken: string };

export const { useAuth, authFetch, login, logout } =
  createAuthProvider<Session>({
    // getAccessToken: (session) => session.accessToken,
    // storage: localStorage,
    storageKey: "access_token",
    onUpdateToken: (token) =>
      fetch("http://localhost:5001/api/refresh", {
        method: "POST",
        body: token.access_Token,
      }).then((res) => res.json()),
  });
