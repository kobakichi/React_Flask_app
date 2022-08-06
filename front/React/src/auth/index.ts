import { createAuthProvider } from "react-token-auth";

type Session = { accessToken: string; refreshToken: string };

export const { useAuth, authFetch, login, logout } =
  createAuthProvider<Session>({
    getAccessToken: (session) => session.accessToken,
    storage: localStorage,
    storageKey: "accessToken",
    onUpdateToken: (token) =>
      fetch("http://localhost:5001/api/refresh", {
        method: "POST",
        body: token.refreshToken,
      }).then((res) => res.json()),
  });
