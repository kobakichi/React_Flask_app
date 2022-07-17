import React, { memo, VFC } from "react";
import styles from "./Register.module.css";
import { SubTitle } from "./SubTitle/SubTitle";
import { Title } from "./Title/Title";
// バックエンドからのレスポンスの型定義
type RegisterUser = {
  username: string;
  password: string;
};

export const Register: VFC = memo(() => {
  return (
    <div className={styles.wrapper}>
      <Title text="Typing EQ" />
      <SubTitle text="short-cut-key version" />
    </div>
  );
});
