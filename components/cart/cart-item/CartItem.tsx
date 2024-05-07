'use client';
import React, { useEffect } from 'react';
import NextImage from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@/lib/hooks';
import { useAppSelector } from '@/lib/hooks';
import { formatPrice } from '@/utils/intl';
import { updateCount } from '@/lib/store/cart/cart-slice';
import { deleteItem } from '@/lib/store/cart/cart-slice';
import { deleteAllItems } from '@/lib/store/cart/cart-slice';
import { Clicker } from '../clicker';
import { IoMdClose } from "react-icons/io";
import { TProduct } from '@/types/product';
import styles from './CartItem.module.scss';

type TCartItemProps = {
  item: TProduct;
};

import defaultImg from '../../../public/default-img.png';
import { notifyInfo } from '@/utils/notify';

const CartItem: React.FC<TCartItemProps> = ({ item }) => {
  const { data: session } = useSession();

  const cartStore = useAppSelector(state => state.cartList);

  const dispatch = useAppDispatch();

  const [count, setCount] = useState(item.count || 1);

  const increaseCount = () => {
    setCount(count => count + 1);
  };

  const decreaseCount = () => {
    if (count === 1) {
      return;
    };

    setCount(count => count - 1);
  };

  const updateCartCount = async () => {
    if (!session?.user?.id) {
      notifyInfo('Войти в аккаунт');
      return;
    };

    try {
      const response = await fetch(`/api/update-cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          count,
          productId: item._id,
          userId: session?.user?.id,
        })
      });

      if (!response.ok) {
        notifyInfo('Что-то пошло не так')
      };

      dispatch(updateCount({ ...item, count }))
    } catch (err) {
      notifyInfo('Ошибка обновления товара')
    }
  };

  const deleteCart = async () => {
    try {
      const response = await fetch(`/api/cart?user=${ session?.user?.id }`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления товара');
      };

      dispatch(deleteAllItems());
    } catch (err) {
      notifyInfo('Ошибка удаления товара');
    };
  };

  const deleteCartItem = async () => {
    if (cartStore.length === 1) {
      deleteCart();
      return;
    };

    try {
      const response = await fetch(
        `/api/update-cart?userId=${ session?.user?.id }&productId=${ item._id }`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления товара')
      };

      dispatch(deleteItem(item));

    } catch (err) {
      notifyInfo('Ошибка удаления товара')
    }
  };

  useEffect(() => {
    updateCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <li className={ styles.cart__item }>
      <div className={ styles.cart__remove }
        onClick={ deleteCartItem }
      >
        <IoMdClose
          size={ 17 }
          color='grey'
        />
      </div>
      <div className={ styles.cart__product }>
        <NextImage
          src={
            item.images ?
              item.images[0].link :
              defaultImg
          }
          width={ 150 }
          height={ 180 }
          alt={ item.title }
          priority
        />
        <div className={ styles.cart__info }>
          <h3 className={ styles.cart__info_title }>
            { item.title }
          </h3>
          <span className={ styles.cart__info_size }>
            размер { item.sizes[0] }
          </span>
          <div className={ styles.cart__info_clicker }>
            <Clicker
              count={ item.count ? item.count : count }
              increaseCount={ increaseCount }
              decreaseCount={ decreaseCount }
            />
          </div>
          {
            item.count && (
              <span className={ styles.cart__info_total }>
                цена за { item.count } шт.
                <span className={ styles.cart__info_price }>
                  {
                    formatPrice('ru')
                      .format(item.price * item.count)
                  }
                </span>
              </span>
            )
          }
        </div>
      </div>
    </li>
  )
};

export { CartItem }