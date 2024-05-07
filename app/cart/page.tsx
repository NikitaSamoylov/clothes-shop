'use client';
import { useSession } from 'next-auth/react';
import NextImage from 'next/image';
import { useAppSelector } from '@/lib/hooks';
import { CartItem } from '@/components/cart/cart-item';
import styles from './page.module.scss';
import { redirect } from 'next/navigation';

import emptyCartImg from './empty-cart.jpg';

const Cart: React.FC = () => {
  const { status } = useSession();

  if (status !== 'authenticated') {
    redirect('/');
  };

  const cartStore = useAppSelector(state => state.cartList);

  const cartItems = cartStore.map(el => {
    return (
      <CartItem key={ el._id }
        item={ el }
      />
    )
  });

  return (
    <section className='container'>
      <h2 className='section-title'>
        {
          cartStore.length !== 0 ?
            'Корзина' :
            'Корзина пуста'
        }
      </h2>
      <ul className={ styles.cart__list }>
        {
          cartStore.length !== 0 ?
            cartItems :
            <div className={ styles.cart__empty }>
              <NextImage
                src={ emptyCartImg }
                alt="корзина пуста"
                width={ 600 }
                height={ 350 }
                priority
                className={ styles.cart__empty_img }
              />
            </div>
        }
      </ul>
    </section>
  )
};

export default Cart;