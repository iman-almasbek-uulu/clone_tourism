// import Image from "next/image";
import scss from "./ForgotPage.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostForgotPasswordMutation } from "@/redux/api/auth";
// import { useState } from "react";
// import logo from "@/assets/icons/logo.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

const ForgotPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AUTH.PostForgotPasswordRequest>();
  const [postForgotPassword] = usePostForgotPasswordMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<AUTH.PostForgotPasswordRequest> = async (
    data
  ) => {
    console.log(
      "🚀 ~ constonSubmit:SubmitHandler<IFormForgotPassword>= ~ data:",
      data
    );

    try {
      const response = await postForgotPassword(data).unwrap();
      alert(response.status);
      router.push("/auth/reset_password");
    } catch (error: any) {
      console.error("Ошибка запроса:", error);
      alert(error?.data?.data?.email?.[0] || "Ошибка при отправке запроса.");
    }
  };

  return (
    <section className={scss.ForgotPage}>
      {/* <Image src={logo} alt="LOGO" /> */}
      <h1>Забыли пароль?</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
        <input
          type="email"
          placeholder="Введите email"
          {...register("email", {
            required: "Введите email",
          })}
        />
        {errors.email && <p className={scss.error}>{errors.email.message}</p>}
        <button type="submit">Отправить письмо сброса</button>
      </form>
      <div className={scss.links}>
        <p>У вас уже есть аккаунт?</p>
        <Link href="/auth/sign-in" className={scss.link}>
          Войти
        </Link>
      </div>
    </section>
  );
};

export default ForgotPage;
