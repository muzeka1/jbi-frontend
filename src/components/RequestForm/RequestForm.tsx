"use client";

import { FormEvent } from "react";

import styles from "./RequestForm.module.css";

type RequestFormProps = {
  title: string;
  buttonText: string;
};

export function RequestForm({
  title,
  buttonText,
}: RequestFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // отправка заявки
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <h2 className={styles.title}>
        {title}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Ваше имя"
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Телефон"
        required
      />

      <button type="submit">
        {buttonText}
      </button>
    </form>
  );
}
