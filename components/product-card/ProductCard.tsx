'use client';
import { useSession } from 'next-auth/react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { TProduct } from '@/types/product';
import { getResponse } from '@/utils/request';
import { useAppDispatch } from '@/lib/hooks';
import { formatPrice } from '@/utils/intl';
import { addFavorites } from '@/lib/store/favorites/favorites.slice';
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { PopupSizes } from './popup-sizes/PopupSizes';
import { notifyInfo } from '@/utils/notify';
import styles from './ProductCard.module.scss';

import defaultImg from './default-img.png';

type TProductProps = {
  data: TProduct;
};

const Product: React.FC<TProductProps> = (
  { data }
) => {
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();
  const favoritesStore = useAppSelector(state => state.favoritesList);
  const cartStore = useAppSelector(state => state.cartList);

  const [inCart, setInCart] = useState(false);
  const [inFavorites, setInFavorites] = useState(false);
  const [isPopup, setIsPopup] = useState(false);


  useEffect(() => {
    cartStore.filter(el => el._id === data._id).length !== 0 ?
      setInCart(true) :
      setInCart(false);

    favoritesStore.filter(el => el._id === data._id).length !== 0 ?
      setInFavorites(true) :
      setInFavorites(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartStore, favoritesStore]);

  const selectPopup = () => {
    setIsPopup(true);
  };

  const getFavorites = (method: 'POST' | 'PUT') => {
    getResponse(
      `/api/favorites`,
      method,
      {
        userId: session?.user?.id,
        goods: data
      }
    )
      .then(() => dispatch(addFavorites(data)))
      .then(() => notifyInfo('Товар добавлен в избранное'))
      .catch(() => notifyInfo('Ошибка добавления в избранное'))
  };

  const prepareForFavorites = () => {
    if (status !== 'authenticated') {
      return;
    };

    if (favoritesStore.length !== 0) {
      getFavorites('PUT')
    };

    if (favoritesStore.length === 0) {
      getFavorites('POST')
    };
  };

  return (
    <li className={ styles.productsItem }>
      <div className={ styles.productsItem__img_wrapper }>
        <Link href={ `/${ data._id }` }>
          <NextImage
            src={
              data.images ?
                data.images[0].link :
                defaultImg
            }
            width={ 275 }
            height={ 308 }
            alt={ 'фото товара' }
            priority
            className={ styles.productsItem__img }
          />
        </Link>
      </div>
      <div className={ styles.productsItem__info }>
        <span className={ styles.productsItem__price }>
          { formatPrice('ru').format(data.price) }
        </span>
        {
          isPopup &&
          <PopupSizes
            sizes={ data.sizes }
            setIsPopup={ () => setIsPopup(isPopup => !isPopup) }
            data={ data }
          />
        }
        <div className={ styles.productsItem__btns }>
          {
            !inFavorites ?
              (
                <button className={
                  `${ styles.productsItem__btns_item }
                   ${ styles.productsItem__btns_wish }`
                }
                  onClick={ prepareForFavorites }
                >
                  <AiOutlineHeart
                    color='grey'
                    size={ 19 }
                  />
                </button>
              ) :
              (
                <button className={
                  `${ styles.productsItem__btns_item }
                   ${ styles.productsItem__btns_wish }`
                }
                  onClick={ () => {
                    notifyInfo('Товар уже в избранном')
                  } }
                >
                  <AiOutlineHeart
                    color='lightgrey'
                    size={ 19 }
                  />
                </button>
              )
          }
          {
            inCart ?
              (
                <button
                  onClick={ () => notifyInfo('Товар уже в корзине') }
                >
                  <BsBagCheck
                    color='lightgrey'
                    size={ 17 }
                  />
                </button>
              ) :
              (
                <button
                  onClick={ selectPopup }
                >
                  <BsBagCheck
                    color='grey'
                    size={ 17 }
                  />
                </button>
              )
          }

        </div>
      </div>
      <p className={ styles.productsItem__brand }>
        { data.brand }
      </p>
      <h4 className={ styles.productsItem__title }>
        { data.title }
      </h4>
    </li>
  )
};

export { Product };