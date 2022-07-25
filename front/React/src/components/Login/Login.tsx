import { Button, Input, Stack } from "@chakra-ui/react";
import React, { memo, VFC } from "react";
import { SubTitle } from "../Register/SubTitle/SubTitle";
import { Title } from "../Register/Title/Title";
import styles from "./Login.module.css";
/**
 * カスタムフック
 */
import { useFormInput } from "../../hooks/useFormInput";

export const Login: VFC = memo(() => {
  // hooksを分割代入する
  const [states, actions] = useFormInput();

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
                onClick={actions.onClickLogin}
              >
                ログイン
              </Button>
            </div>
          </Stack>
        </div>
        {/* ログインに失敗した時の処理 */}
        {states.isError && (
          <p className={styles.errorMessage}>{states.errorMessage}</p>
        )}
      </div>
    </div>
  );
});
