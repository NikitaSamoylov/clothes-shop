'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from "@/lib/hooks";
import { fetchCart } from "@/lib/store/cart/cart-slice";
import { Toaster } from 'react-hot-toast';
import { MdOutlineMenu } from "react-icons/md";
import Logo from './logo.png';
import { HeaderBtns } from './header-btns';
import { Nav } from '../nav';
import { MobileNav } from '../nav-mobile';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const [userIsAuthorized, setUserIsAuthorized] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    setUserIsAuthorized(session?.user ? session.user.id : null)
    userIsAuthorized ?
      dispatch(fetchCart(userIsAuthorized)) :
      userIsAuthorized
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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
          duration: 3000,
          style: {
            background: '#5b9fb3',
            color: '#fff',
            fontSize: '16px',
          },
        } }
      />
    </div>
  )
};

export { Header };