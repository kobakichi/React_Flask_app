import { Button, Input, Stack } from "@chakra-ui/react";
import React, { memo, useState, VFC } from "react";
import { SubTitle } from "../Register/SubTitle/SubTitle";
import { Title } from "../Register/Title/Title";
import styles from "./Login.module.css";
/**
 * カスタムフック
 */
import { useFormInput } from "../../hooks/useFormInput";
import axios from "axios";
import { RegisterUser } from "../../types/User";
import { useNavigate } from "react-router-dom";

export const Login: VFC = memo(() => {
  // hooksを分割代入する
  const [states, actions] = useFormInput();
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  // /loginエンドポイントへデータを送信する処理
  const postLoginUser = async () => {
    try {
      const result = await axios.post<RegisterUser>(
        "http://localhost:5001/api/login",
        {
          username: states.userName,
          password: states.passWord,
        }
      );
      return result.data;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  // クリックした時に発火する関数
  const onClickLogin = () => {
    postLoginUser()
      .then((result) => {
        console.log(result);
        // localstrageへtokenをセット
        localStorage.setItem("token", result.access_token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setErrorMessage("入力内容をお確かめください。");
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Title text="Typing EQ" />
        <SubTitle text="short-cut-key version" />
        <div className={styles.form}>
          <Stack spacing={10}>
            <Input
              color={"white"}
              size={"lg"}
              placeholder="user name"
              background={"#0A5163"}
              borderColor={"#268BD2"}
              _placeholder={{ opacity: 1, color: "#268BD2" }}
              onChange={actions.onChangeUserNameInput}
            />
            <Input
              type="password"
              color={"white"}
              size={"lg"}
              background={"#0A5163"}
              borderColor={"#268BD2"}
              placeholder="pass word"
              _placeholder={{ opacity: 1, color: "rgba(38, 139, 210, 1)" }}
              onChange={actions.onChangePasswordInput}
            />
            <div className={styles.button}>
              <Button
                size={"lg"}
                width="200px"
                background={"#2AA198"}
                borderColor={"#268BD2"}
                color={"white"}
                _hover={{ background: "#36DBCE", cursor: "pointer" }}
                onClick={onClickLogin}
              >
                ログイン
              </Button>
            </div>
          </Stack>
        </div>
        {/* ログインに失敗した時の処理 */}
        {isError && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
});
