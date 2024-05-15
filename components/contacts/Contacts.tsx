'use client';
import React, { ChangeEvent, TextareaHTMLAttributes, useState } from 'react';
import { Button } from '../button';
import styles from './Contacts.module.scss';
import { notifyInfo } from '@/utils/notify';

type TForm = {
  name: string;
  email: string;
  message: string;
};

const ContactsForm: React.FC = () => {
  const [form, setForm] = useState<TForm>({
    name: '',
    email: '',
    message: ''
  })

  const onFieldsChange = (
    e: ChangeEvent<HTMLInputElement> |
      ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setForm(form => ({
      ...form, [name]: value
    }))
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(data => data.json())
      .then(() => notifyInfo('Письмо отправлено, скоро с вами свяжемся'))
      .catch(() => notifyInfo('Ошибка отправки сообщения'))
  };

  return (
    <form onSubmit={ (e) => onSubmit(e) }
      className={ styles.contacts__form }
    >
      <input type="text"
        value={ form.name }
        placeholder='Ваше имя'
        name='name'
        required
        minLength={ 1 }
        className={ styles.contacts__item }
        onChange={ (e) => onFieldsChange(e) }
      />
      <input type="email"
        value={ form.email }
        placeholder='Ваш email'
        name='email'
        required
        minLength={ 1 }
        className={ styles.contacts__item }
        onChange={ (e) => onFieldsChange(e) }
      />
      <textarea
        style={ { resize: 'none' } }
        rows={ 7 }
        value={ form.message }
        placeholder='Сообщение'
        name='message'
        required
        minLength={ 1 }
        className={ styles.contacts__item }
        onChange={ (e) => onFieldsChange(e) }
      />
      <Button title={ 'Отправить' } />
    </form>
  )
};

export { ContactsForm };