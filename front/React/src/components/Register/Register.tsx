import { Button, Input, Stack } from "@chakra-ui/react";
import React, { memo, VFC } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import styles from "./Register.module.css";
import { SubTitle } from "./SubTitle/SubTitle";
import { Title } from "./Title/Title";

export const Register: VFC = memo(() => {
  // カスタムフックの呼び出し
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
              background={"#0A5163"}
              borderColor={"#268BD2"}
              placeholder="user name"
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
                onClick={actions.onClickRegister}
              >
                登録する
              </Button>
            </div>
          </Stack>
        </div>
        {/* ユーザーが重複していた場合の処理 */}
        {states.isError && (
          <p className={styles.errorMessage}>{states.errorMessage}</p>
        )}
      </div>
    </div>
  );
});
