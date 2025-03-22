import scss from "./ResetPasswordPage.module.scss";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostResetPasswordMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
// import { useState } from "react";
// import logo from "@/assets/icons/logo.svg";
// import Link from "next/link";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AUTH.PostResetPasswordRequest>();
  const [postResetPassword] = usePostResetPasswordMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<AUTH.PostResetPasswordRequest> = async (
    data
  ) => {
    try {
      const response = await postResetPassword({
        email: data.email,
        reset_code: data.reset_code, 
        new_password: data.new_password, 
      }).unwrap();
      alert(response.message);
      router.push("/auth/sign-in");
    } catch (error: any) {
      console.error("Ошибка:", error);
      alert(error?.data?.message || "Ошибка при сбросе пароля.");
    }
  };

  return (
    <section className={scss.ResetPasswordPage}>
      {/* <Image src={logo} alt="LOGO" /> */}
      <h1>Новый пароль</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
        <input
          type="text"
          placeholder="Введите новый пароль"
          {...register("new_password", { required: "Поле обязательно" })}
        />
        {errors.new_password && (
          <p className={scss.error}>{errors.new_password.message}</p>
        )}

        <input
          type="text"
          placeholder="Введите email"
          {...register("email", { required: "Поле обязательно" })}
        />
        {errors.email && <p className={scss.error}>{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Введите код сброса"
          {...register("reset_code", { required: "Поле обязательно" })}
        />
        {errors.reset_code && (
          <p className={scss.error}>{errors.reset_code.message}</p>
        )}

        <button type="submit">Сбросить пароль</button>
      </form>
    </section>
  );
};

export default ResetPasswordPage;
