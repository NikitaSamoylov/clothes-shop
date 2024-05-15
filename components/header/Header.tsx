'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from "@/lib/hooks";
import { Toaster } from 'react-hot-toast';
import { MdOutlineMenu } from "react-icons/md";
import Logo from './logo.png';
import { addProduct } from '@/lib/store/cart/cart-slice';
import { addOrder } from '@/lib/store/orders/orders-slice';
import { addFavorites } from '@/lib/store/favorites/favorites.slice';
import { addLoading } from '@/lib/store/get-user-loading/get-user-loading';
import { TProduct, TOrderGoods } from '@/types/product';
import { HeaderBtns } from './header-btns';
import { Nav } from '../nav';
import { MobileNav } from '../nav-mobile';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();

  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    dispatch(addLoading(true));

    Promise.all([
      fetch(`/api/cart?user=${ session?.user?.id }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      fetch(
        `/api/orders?user=${ session?.user?.id }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      ),
      fetch(`/api/favorites?user=${ session?.user?.id }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    ])
      .then((response) => Promise.all(response.map((res) => res.json())))
      .then((data) => {
        data[0].cart.length !== 0 ?
          data[0].cart[0].goods.map((el: TProduct) => (
            dispatch(addProduct(el))
          )) :
          data;

        data[1].orders.length !== 0 ?
          data[1].orders[0].orders.map((el: TOrderGoods) => (
            dispatch(addOrder(el))
          )) :
          data;

        data[2].favoritesList.length !== 0 ?
          data[2].favoritesList[0].goods.map((el: TProduct) => (
            dispatch(addFavorites(el))
          )) :
          data;
      })
      .then(() => dispatch(addLoading(false)))
      .catch((err) => {
        console.log(err);
        dispatch(addLoading(false));
      })
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