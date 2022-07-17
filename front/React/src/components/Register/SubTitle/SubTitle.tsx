import React from "react";
import styles from "./SubTitle.module.css";

type Props = {
  text: string;
};

export const SubTitle = (props: Props) => {
  const { text } = props;
  return (
    <div>
      <h2 className={styles.subtitle}>{text}</h2>
    </div>
  );
};
