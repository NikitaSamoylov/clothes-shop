'use client';
import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getResponse } from '@/utils/request';
import { useAppDispatch } from '@/lib/hooks';
import { Button } from '@/components/button';
import { formatPrice } from '@/utils/intl';
import { deleteAllItems } from '@/lib/store/cart/cart-slice';
import { notifyInfo } from '@/utils/notify';
import { TProduct } from '@/types/product';
import styles from './CartTotal.module.scss';

const CartTotal: React.FC = () => {
  const { data: session } = useSession();

  const cartStore: TProduct[] = useAppSelector(state => state.cartList);

  const dispatch = useAppDispatch();

  const [productsSum, setProductsSum] = useState(0);

  // const sum = cartStore.reduce((currentSum, item) => {
  //   return currentSum + (item.price * item.count!)
  // }, 0);

  const sale = cartStore.length >= 3 ?
    15 : 0;
  const shipping = productsSum >= 1500 ?
    0 :
    350;

  useEffect(() => {
    setProductsSum(cartStore.reduce((currentSum, item) => {
      return currentSum + (item.price * item.count!)
    }, 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartStore]);

  const placeOrder = async () => {
    const orderBody = {
      userId: session?.user?.id,
      orders: [{
        date: Date.now(),
        price: productsSum - (productsSum * (sale / 100)) + shipping,
        goods: cartStore
      }]
    };

    getResponse('/api/orders', 'POST', orderBody)
      .then(() => notifyInfo('Спасибо за заказ! Уже в работе.'))
      .then(() =>
        getResponse(`/api/cart?user=${ session?.user?.id }`, 'DELETE')
      )
      .then(() => dispatch(deleteAllItems()))
      .catch(() => notifyInfo('Что-то пошло не так'))
  };

  return (
    <div className={ styles.cart_total__wrapper }>
      <h2 className={ styles.cart_total__title }>
        Детали заказа
      </h2>
      <ul className={ styles.cart_total__list }>
        <li className={ styles.cart_total__item }>
          Стоимость: { formatPrice('ru').format(productsSum) }
        </li>
        <li className={ styles.cart_total__item }>
          {
            sale ?
              `Скидка от ${ cartStore.length } товаров: ${ sale }%` :
              `Скидка до 3 товаров: ${ sale }%`
          }
        </li>
        <li className={ styles.cart_total__item }>
          {
            !shipping ?
              `
                Доставка Почтой от ${ formatPrice('ru').format(1500)
              }: ${ formatPrice('ru').format(0) }
              ` :
              `
                Доставка Почтой до ${ formatPrice('ru').format(1500)
              } :
                ${ formatPrice('ru').format(350) }
              `
          }
        </li>
        <li className={ styles.cart_total__item }>
          Итоговая стоимость: {
            formatPrice('ru')
              .format(productsSum - (productsSum * (sale / 100)) + shipping)
          }
        </li>
      </ul>
      <div className={ styles.cart_total__btn }
        onClick={ placeOrder }
      >
        <Button title={ 'Заказать' } />
      </div>
    </div>
  )
};

export { CartTotal };