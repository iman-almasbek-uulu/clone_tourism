"use client";
import scss from "./SignUpPage.module.scss";
import { usePostRegistrationMutation } from "@/redux/api/auth";
import { ConfigProvider } from "antd";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Switch } from "antd";
import Link from "next/link";

const SignUpPage: FC = () => {
  const [postRegisterMutation] = usePostRegistrationMutation();
  const [showModal, setShowModal] = useState(false); // Состояние для модалки
  const [modalMessage, setModalMessage] = useState(""); // Сообщение модалки

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AUTH.PostRegistrationRequest>();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit: SubmitHandler<AUTH.PostRegistrationRequest> = async (
    userData
  ) => {
    // Проверка на наличие ошибок
    if (Object.keys(errors).length > 0) {
      setModalMessage("Пожалуйста, заполните все обязательные поля.");
      setShowModal(true);
      return;
    }

    const dataRegistr = {
      email: userData.email,
      password: userData.password,
      confirm_password: userData.confirm_password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone_number,
      birth_date: userData.birth_date,
    };
    try {
      const response = await postRegisterMutation(dataRegistr);
      if (response.data?.access) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", JSON.stringify(response.data));
        console.log(response.data);
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Убедимся, что номер начинается с +996
    if (!value.startsWith("+996")) {
      value = "+996" + value.replace(/[^0-9]/g, "");
    }

    // Ограничиваем длину номера (например, +996 и 9 цифр)
    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    setValue("phone_number", value);
  };

  return (
    <section className={scss.RegistrationPage}>
      <h1 className={scss.authTitle}>Sign up</h1>
      <h2>Создать аккаунт</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: "Email обязателен" })}
          placeholder="Email"
        />
        {errors.email && (
          <span className={scss.error}>{errors.email.message}</span>
        )}

        <input
          type="password"
          {...register("password", { required: "Пароль обязателен" })}
          placeholder="Пароль"
        />
        {errors.password && (
          <span className={scss.error}>{errors.password.message}</span>
        )}

        <input
          type="password"
          {...register("confirm_password", {
            required: "Подтверждение пароля обязательно",
          })}
          placeholder="Повторите пароль"
        />
        {errors.confirm_password && (
          <span className={scss.error}>{errors.confirm_password.message}</span>
        )}

        <div className={scss.userName}>
          <p>
            Name <span>*</span> {errors.first_name && (
            <span className={scss.error}>{errors.first_name.message}</span>
          )}
          </p>
          <p>
            Surname <span>*</span> {errors.last_name && (
            <span className={scss.error}>{errors.last_name.message}</span>
          )}
          </p>
          <input
            type="text"
            {...register("first_name", { required: "Имя обязательно" })}
            placeholder="Name"
          />
        

          <input
            type="text"
            {...register("last_name", { required: "Фамилия обязательна" })}
            placeholder="Surname"
          />
         

          <p>
            Phone number <span>*</span> {errors.phone_number && (
            <span className={scss.error}>{errors.phone_number.message}</span>
          )}
          </p>
          <p>
            Birth date <span>*</span> {errors.birth_date && (
            <span className={scss.error}>{errors.birth_date.message}</span>
          )}
          </p>
          <input
            type="tel"
            {...register("phone_number", {
              required: "Номер телефона обязателен",
              pattern: {
                value: /^\+996\d{9}$/,
                message: "Номер телефона должен быть в формате +996XXXXXXXXX",
              },
            })}
            placeholder="+996XXXXXXXXX"
            onChange={handlePhoneNumberChange}
          />
         

          <input
            type="date"
            {...register("birth_date", {
              required: "Дата рождения обязательна",
            })}
            placeholder="Birth date"
          />
         
        </div>

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "407EC7",
              colorBorder: "#000",
            },
          }}
        >
          <Switch
            className={scss.customCheckbox}
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
        </ConfigProvider>

        <button type="submit">Зарегистрироваться</button>
      </form>

      <div className={scss.links}>
        <p>У вас уже есть аккаунт?</p>
        <Link href="/auth/sign-in" className={scss.link}>
          Войти
        </Link>
      </div>

      {/* Модалка с предупреждением */}
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

export default SignUpPage;