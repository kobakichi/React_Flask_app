import { Button, Input, Stack } from "@chakra-ui/react";
import React, { memo, VFC, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { cursorTo } from "readline";
import styles from "./Register.module.css";
import { SubTitle } from "./SubTitle/SubTitle";
import { Title } from "./Title/Title";
import axios from "axios";
// バックエンドからのレスポンスの型定義
type RegisterUser = {
  username: string;
  password: string;
};

export const Register: VFC = memo(() => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  // usernameを保持する関数
  const onChangeUserNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  // passwordを保持する関数
  const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassWord(e.target.value);
  };

  // ユーザーの登録処理
  const postRegisterUser = async () => {
    try {
      const result = await axios.post<RegisterUser>(
        "http://localhost:5001/api/register",
        {
          username: userName,
          password: passWord,
        }
      );
      return result.data;
    } catch (err: any) {
      throw new Error(err);
    }
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
              background={"#0A5163"}
              borderColor={"#268BD2"}
              placeholder="user name"
              _placeholder={{ opacity: 1, color: "#268BD2" }}
              onChange={onChangeUserNameInput}
            />
            <Input
              type="password"
              color={"white"}
              size={"lg"}
              background={"#0A5163"}
              borderColor={"#268BD2"}
              placeholder="pass word"
              _placeholder={{ opacity: 1, color: "rgba(38, 139, 210, 1)" }}
              onChange={onChangePasswordInput}
            />
            <div className={styles.button}>
              <Button
                size={"lg"}
                width="200px"
                background={"#2AA198"}
                borderColor={"#268BD2"}
                color={"white"}
                _hover={{ background: "#36DBCE", cursor: "pointer" }}
              >
                登録する
              </Button>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
});
