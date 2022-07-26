// バックエンドからのレスポンスの型定義
export type RegisterUser = {
  username: string;
  password: string;
  access_token: string;
  access_Token: string;
  refreshToken: string;
};
