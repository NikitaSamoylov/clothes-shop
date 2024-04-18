'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import FormImage from './login_img.png';
import styles from './AuthForm.module.scss';

type Inputs = {
  username: string
  password: string
}

const AuthForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<Inputs>({
    mode: 'onBlur'
  });

  const onSubmit = (data: Inputs) => {
    alert(JSON.stringify(data))
    reset();
  };

  return (
    <section className={ styles.loginForm }>
      <div>
        <Image
          src={ FormImage }
          width={ FormImage.width }
          height={ FormImage.height }
          alt='фоновая картинка'
        />
      </div>
      <form className={ styles.form }
        onSubmit={ handleSubmit(onSubmit) }
      >
        <label htmlFor="name"
          className={ styles.form__item_label }
        >
          введите имя
          <input type="text"
            className={
              `${ styles.form__item }
            ${ styles.form__item_name }`
            }
            id='name'
            {
            ...register("username", {
              required: 'заполните поле',
              minLength: {
                value: 2,
                message: 'минимум 2 символа'
              }
            })
            }
          />
          <span className={ styles.form__item_notice }>
            {
              errors.username ?
                errors.username.message :
                null
            }
          </span>
        </label>
        <label htmlFor='password'
          className={ styles.form__item_label }
        >
          введите пароль
          <input type="password"
            className={
              `${ styles.form__item }
            ${ styles.form__item_password }`
            }
            id='password'
            {
            ...register("password", {
              required: 'введите пароль',
              minLength: {
                value: 6,
                message: 'минимум 6 символов'
              }
            })
            }
          />
          <span className={ styles.form__item_notice }>
            {
              errors.password ?
                errors.password.message :
                null
            }
          </span>
        </label>
        <button type="submit"
          className={ styles.form__btn }
          disabled={ !isValid }
        >
          войти
        </button>
        <span className={ styles.form__msg }>
          Не зарегистрированы? Создайте
          <Link href='/signup'
            className={ styles.form__msg_link }
          >
            аккаунт
          </Link>
        </span>
      </form>
    </section>
  )
};

export { AuthForm };