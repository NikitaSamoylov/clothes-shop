'use client';
import NextImage from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { TProduct } from '@/types/product';
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { PopupSizes } from './popup-sizes';
import { formatPrice } from '@/utils/intl';
import { notifyInfo } from '@/utils/notify';
import styles from './ProductsItem.module.scss';

import defaultImg from './default-img.png';

type TProductProps = {
  data: TProduct;
};

const Product: React.FC<TProductProps> = (
  { data }
) => {
  const [inCart, setInCart] = useState(false);
  const [isPopup, setIsPopup] = useState(false);

  const cartStore = useAppSelector(state => state.cartList);

  useEffect(() => {
    cartStore.filter(el => el._id === data._id).length !== 0 ?
      setInCart(true) :
      setInCart(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartStore]);

  const selectPopup = () => {
    setIsPopup(true);
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
          <button className={
            `${ styles.productsItem__btns_item }
              ${ styles.productsItem__btns_wish }`
          }>
            <AiOutlineHeart
              color='grey'
              size={ 19 }
            />
          </button>
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