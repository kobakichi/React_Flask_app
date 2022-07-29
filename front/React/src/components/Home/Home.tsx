import React from "react";
import { useRecoilValue } from "recoil";
import { userAuthState } from "../../atom/userAuthState";
import styles from "./Home.module.css";

export const Home = () => {
  // atomのデータを使用する。
  const userData = useRecoilValue(userAuthState);
  console.log(userData);

  return (
    <div className={styles.wrapper}>
      <h1>Typing EQ short_cut_key version</h1>
      <p>your name: {userData.username}</p>
    </div>
  );
};
