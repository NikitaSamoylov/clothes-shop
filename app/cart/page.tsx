'use client';
import { useSession } from 'next-auth/react';
import { TfiShoppingCartFull } from "react-icons/tfi";
import { useAppSelector } from '@/lib/hooks';
import { CartItem } from '@/components/cart/cart-item';
import { CartTotal } from '@/components/cart/cart-total';
import styles from './page.module.scss';
import { redirect } from 'next/navigation';

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
    );
  });

  return (
    <section className='container'>
      <h2 className='section-title'
        style={ { textAlign: 'center' } }
      >
        {
          cartStore.length !== 0 ?
            'Корзина' :
            'Корзина пуста'
        }
      </h2>
      <div className={ styles.cart__content }>
        {
          cartStore.length !== 0 ?
            (
              <>
                <ul className={ styles.cart__list }>
                  { cartItems }
                </ul>
                <CartTotal />
              </>
            ) :
            <div className={ styles.cart__empty }>
              <TfiShoppingCartFull
                color="rgb(147 200 211)"
                size="80"
              />
            </div>
        }
      </div>
    </section>
  )
};

export default Cart;