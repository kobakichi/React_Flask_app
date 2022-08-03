import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { memo, useState, VFC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormInput } from "../../hooks/useFormInput";
import { RegisterUser } from "../../types/User";
import styles from "./Register.module.css";
import { SubTitle } from "./SubTitle/SubTitle";
import { Title } from "./Title/Title";

export const Register: VFC = memo(() => {
  // カスタムフックの呼び出し
  const [states, actions] = useFormInput();

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

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

  // ユーザーの登録処理
  const postRegisterUser = async () => {
    try {
      const result = await axios.post<RegisterUser>(
        "http://localhost:5001/api/register",
        {
          username: values.username,
          password: values.password,
        }
      );
      return result.data;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  // 登録ボタンを押した時に発火する関数
  const onClickRegister = () => {
    postRegisterUser()
      .then((result) => {
        console.log(result);
        // localstrageへaccess_tokenをセットする
        localStorage.setItem("token", result.access_token);
        // 登録が完了したらhomeへ移動する。
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setErrorMessage(`${values.username}は既に存在しています。`);
      });
    // .finally(() => console.log("登録完了"));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Title text="Typing EQ" />
        <SubTitle text="short-cut-key version" />
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onClickRegister)}>
            <Stack spacing={10}>
              {/* フォームコントロール */}
              <FormControl
                id="username"
                isRequired
                isInvalid={errors.username ? true : false}
              >
                <Input
                  color={"white"}
                  size={"lg"}
                  background={"#0A5163"}
                  borderColor={"#268BD2"}
                  placeholder="user name"
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
                id="password"
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
                      value: 8,
                      message: "8文字以上で入力してください",
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
                  登録する
                </Button>
              </div>
            </Stack>
          </form>
        </div>
        {/* ユーザーが重複していた場合の処理 */}
        {isError && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
});
