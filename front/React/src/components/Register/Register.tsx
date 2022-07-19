import { Button, Input, Stack } from "@chakra-ui/react";
import React, { memo, VFC } from "react";
import { cursorTo } from "readline";
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
            />
            <Input
              type="password"
              color={"white"}
              size={"lg"}
              background={"#0A5163"}
              borderColor={"#268BD2"}
              placeholder="pass word"
              _placeholder={{ opacity: 1, color: "rgba(38, 139, 210, 1)" }}
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
