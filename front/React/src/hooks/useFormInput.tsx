/**
 * useFormInput
 * カスタムフック
 */
import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth";
import { RegisterUser } from "../types/User";

export const useFormInput = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

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

  // /loginエンドポイントへデータを送信する処理
  const postLoginUser = async () => {
    try {
      const result = await axios.post<RegisterUser>(
        "http://localhost:5001/api/login",
        {
          username: userName,
          password: passWord,
          access_token: localStorage.getItem("token"),
        }
      );
      return result.data;
    } catch (err: any) {
      throw new Error(err);
    }
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
      // if (err.response.status === 401) {
      //   setErrorMessage(`${userName}は既に存在しています。`);
      // }
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
        setErrorMessage(`${userName}は既に存在しています。`);
      });
    // .finally(() => console.log("登録完了"));
  };

  const onClickLogin = () => {
    postLoginUser()
      .then((result) => {
        if (result.access_token) {
          login(result);
        }
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

  /**
   * hooksの返り値
   * 第一引数、state
   * 第二引数、関数、変数
   */
  return [
    {
      userName,
      passWord,
      errorMessage,
      isError,
    },
    {
      onChangeUserNameInput,
      onChangePasswordInput,
      onClickLogin,
      onClickRegister,
    },
  ];
};
