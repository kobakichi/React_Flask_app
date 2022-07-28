// バックエンドからのレスポンスの型定義
export type RegisterUser = {
  user_id: number;
  username: string;
  password: string;
  access_token: string;
  access_Token: string;
  refreshToken: string;
};
