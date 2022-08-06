import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAuthState } from "../../atom/userAuthState";
import { authFetch } from "../../auth";
import styles from "./Home.module.css";

export const Home = () => {
  // atomのデータを使用する。
  const userData = useRecoilValue(userAuthState);
  console.log(userData);

  // useEffect(() => {
  //   authFetch("http://localhost:5001/api/protected")
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Typing EQ short_cut_key version</h1>
      <p>your name: {userData.username}</p>
    </div>
  );
};
