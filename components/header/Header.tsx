'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from "@/lib/hooks";
import { addProduct } from '@/lib/store/cart/cart-slice';
import { getResponse } from '@/utils/request';
import { Toaster } from 'react-hot-toast';
import { MdOutlineMenu } from "react-icons/md";
import Logo from './logo.png';
import { addOrder } from '@/lib/store/orders/orders-slice';
import { TProduct, TOrder, TOrderGoods } from '@/types/product';
import { HeaderBtns } from './header-btns';
import { Nav } from '../nav';
import { MobileNav } from '../nav-mobile';
import styles from './Header.module.scss';
import { notifyInfo } from '@/utils/notify';

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();

  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'authenticated') {
      getResponse(`/api/cart?user=${ session?.user?.id }`, 'GET', null)
        .then(data => (
          data.cart.length !== 0 ?
            data.cart[0].goods.map((el: TProduct) => (
              dispatch(addProduct(el))
            )) :
            data
        ))
        .catch(() => notifyInfo('Ошибка получения корзины'))
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (status === 'authenticated') {
      getResponse(`/api/orders?user=${ session?.user?.id }`, 'GET', null)
        .then((data) => (
          data.orders !== undefined ?
            data.orders[0].orders.map((el: TOrderGoods) => (
              dispatch(addOrder(el))
            )) :
            data
        ))
        .catch(() => notifyInfo('Ошибка получения заказов'))
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className='container'>
      <div className={ styles.header }>
        <button className={ styles.header__mobile_icon }
          onClick={ () => (
            setMobileMenu(mobileMenu => !mobileMenu)
          ) }
        >
          <MdOutlineMenu size={ 25 } />
        </button>
        <div className={ styles.header__logo }>
          <Link href='/'>
            <Image
              src={ Logo }
              width={ Logo.width }
              height={ Logo.height }
              alt='logo'
            />
          </Link>
        </div>
        <div className={ styles.header__nav }>
          <Nav />
        </div>
        <HeaderBtns />
        <MobileNav width={ mobileMenu ? '100%' : '0' }
          setMobileMenu={ () => (
            setMobileMenu(mobileMenu => !mobileMenu)
          ) }
          mobileMenu={ mobileMenu }
        />
      </div>
      <Toaster
        position="top-center"
        reverseOrder={ false }
        gutter={ 8 }
        toastOptions={ {
          duration: 2000,
          style: {
            background: '#5b9fb3',
            color: '#fff',
            fontSize: '16px',
            textAlign: 'center',
            maxWidth: '250px',
          },
        } }
      />
    </div>
  )
};

export { Header };