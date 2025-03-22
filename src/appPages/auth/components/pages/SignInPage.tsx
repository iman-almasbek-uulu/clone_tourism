"use client";
import scss from "./SignInPage.module.scss";
import { usePostLoginMutation } from "@/redux/api/auth";
import { ConfigProvider, Switch } from "antd";
import Link from "next/link";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface signInProps {
  email: string;
  password: string;
}

const SignInPage: FC = () => {
  const [postLoginMutation] = usePostLoginMutation();
  const [showModal, setShowModal] = useState(false); // Состояние для модалки
  const [modalMessage, setModalMessage] = useState(""); // Сообщение модалки
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AUTH.PostLoginRequest>();
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  const onSubmit: SubmitHandler<signInProps> = async (userData) => {
    if (Object.keys(errors).length > 0) {
      setModalMessage("Пожалуйста, заполните все обязательные поля.");
      setShowModal(true);
      return;
    }

    const datalogin = {
      email: userData.email,
      password: userData.password,
    };
    try {
      const response = await postLoginMutation(datalogin);
      if (response.data?.access) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", JSON.stringify(response.data));
      }

      window.location.reload();
      console.log(response.data);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  return (
    <section className={scss.LoginPage}>
      <h1 className={scss.authTitle}>Sign in</h1>
      <h2>Войдите в аккаунт</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.email && (
          <span className={scss.error}>{errors.email.message}</span>
        )}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Введите Email" })}
        />
          {errors.password && (
            <span className={scss.error}>{errors.password.message}</span>
          )}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Введите пароль" })}
        />
        <div className={scss.links}>
          <div className={scss.Remember}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "407EC7", // Основной цвет
                  colorBorder: "#000", // Цвет границы
                },
              }}
            >
              <Switch
                className={scss.customCheckbox}
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
            </ConfigProvider>
            <p>Remember me</p>
          </div>
          <Link href="/auth/forgot" className={scss.link}>
            Забыли пароль?
          </Link>
        </div>
        <button type="submit">Войти</button>
      </form>
      {/* <div className={scss.orLine}>
        <div className={scss.line}></div>
        <p>или</p>
        <div className={scss.line}></div>
      </div>
      <div className={scss.google}>
        <button className={scss.link} onClick={() => signIn("google")}>
          <Image src={google} alt="Google" />
        </button>
      </div> */}
      <div className={scss.nav}>
        <p>У вас нет аккаунта?</p>
        <Link href="/auth/sign-up" className={scss.link}>
          Зарегестрироваться
        </Link>
      </div>
      {showModal && (
        <div className={scss.modalOverlay}>
          <div className={scss.modalContent}>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SignInPage;
