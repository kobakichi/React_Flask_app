import React from "react";
import styles from "./Title.module.css";

// 親コンポーネントより受け取るpropsの型定義
type TitleProps = {
  text: string;
};

// propsを分割代入している。
export const Title = (props: TitleProps) => {
  const { text } = props;
  return <h1 className={styles.title}>{text}</h1>;
};
