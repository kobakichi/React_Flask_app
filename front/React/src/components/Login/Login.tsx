import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { memo, useState, VFC } from "react";
import { SubTitle } from "../Register/SubTitle/SubTitle";
import { Title } from "../Register/Title/Title";
import styles from "./Login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
/**
 * カスタムフック
 */
import { useFormInput } from "../../hooks/useFormInput";
import { RegisterUser } from "../../types/User";
import axios from "axios";
import { login } from "../../auth";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAuthState } from "../../atom/userAuthState";

export const Login: VFC = memo(() => {
  // hooksを分割代入する
  const [states, actions] = useFormInput();

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // atomの更新関数を変数へ入れる。
  const setLogin = useSetRecoilState(userAuthState);

  const navigate = useNavigate();

  // react-hook-formのバリデーション
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterUser>({ mode: "all", reValidateMode: "onChange" });

  // registerに入った値を取得する。
  const values = getValues();

  // /loginエンドポイントへデータを送信する処理
  const postLoginUser = async () => {
    try {
      const result = await axios.post<RegisterUser>(
        "http://localhost:5001/api/login",
        {
          username: values.username,
          password: values.password,
          accessToken: localStorage.getItem("token"),
        }
      );
      return result.data;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const onClickLogin = () => {
    postLoginUser()
      .then((result) => {
        if (result.accessToken) {
          login(result);
        }
        console.log(result);
        // atomの更新関数読み込み
        setLogin(result);
        // localstrageへtokenをセット
        localStorage.setItem("token", result.accessToken);
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
          <form onSubmit={handleSubmit(onClickLogin)}>
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
              <FormControl
                id="passWord"
                isRequired
                isInvalid={errors.password ? true : false}
              >
                <Input
                  type="password"
                  color={"white"}
                  size={"lg"}
                  background={"#0A5163"}
                  borderColor={"#268BD2"}
                  placeholder="pass word"
                  _placeholder={{ opacity: 1, color: "rgba(38, 139, 210, 1)" }}
                  {...register("password", {
                    required: "パスワードを入力してください",
                    minLength: {
                      value: 4,
                      message: "4文字以上で入力してください",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <div className={styles.button}>
                <Button
                  size={"lg"}
                  width="200px"
                  background={"#2AA198"}
                  borderColor={"#268BD2"}
                  color={"white"}
                  _hover={{ background: "#36DBCE", cursor: "pointer" }}
                  type="submit"
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
