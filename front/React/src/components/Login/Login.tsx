import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { memo, VFC } from "react";
import { SubTitle } from "../Register/SubTitle/SubTitle";
import { Title } from "../Register/Title/Title";
import styles from "./Login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
/**
 * カスタムフック
 */
import { useFormInput } from "../../hooks/useFormInput";
import { RegisterUser } from "../../types/User";

// type RegisterUser = {
//   userName: string;
//   passWord: string;
// };

export const Login: VFC = memo(() => {
  // hooksを分割代入する
  const [states, actions] = useFormInput();

  // react-hook-formのバリデーション
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterUser>({ mode: "all" });

  // formタグに渡す関数
  const handleOnSubmit: SubmitHandler<RegisterUser> = (values) => {
    console.log(values);
  };

  console.log(watch("username"));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Title text="Typing EQ" />
        <SubTitle text="short-cut-key version" />
        <div className={styles.form}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Stack spacing={10}>
              {/* usernameのフォームコントロール */}
              <FormControl
                id="username"
                isRequired
                isInvalid={errors.username ? true : false}
              >
                <Input
                  color={"white"}
                  size={"lg"}
                  placeholder="user name"
                  background={"#0A5163"}
                  borderColor={"#268BD2"}
                  _placeholder={{ opacity: 1, color: "#268BD2" }}
                  {...register("username", {
                    required: "ユーザー名を入力してください",
                    maxLength: {
                      value: 10,
                      message: "10文字以内で入力してください",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
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
          </form>
        </div>
        {/* ログインに失敗した時の処理 */}
        {states.isError && (
          <p className={styles.errorMessage}>{states.errorMessage}</p>
        )}
      </div>
    </div>
  );
});
