// バックエンドからのレスポンスの型定義
export type RegisterUser = {
  user_id: number;
  username: string;
  password: number;
  accessToken: string;
  refreshToken: string;
};
