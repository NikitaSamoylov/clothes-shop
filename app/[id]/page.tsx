'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import NextImage from 'next/image';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addProduct } from "@/lib/store/cart/cart-slice";
import { TProductForUpload, TUserCart } from "@/types/product";
import { formatPrice } from "@/utils/intl";
import { Button } from "@/components/button";
import { getResponse } from "@/utils/request";
import { notifyInfo } from "@/utils/notify";
import ProductLoader from "@/components/preloaders/ProductLoader";
import styles from './page.module.scss';

import defaultImage from './default-image.png';

type TLoadProductProps = {
  params: {
    id: string;
  };
};

const LoadProduct: React.FC<TLoadProductProps> = (
  { params: { id } }
) => {

  const { data: session } = useSession();

  const cartStore = useAppSelector(state => state.cartList);

  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<TProductForUpload>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [size, setSize] = useState<string[]>([]);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    fetch(`/api/get-single-product?id=${ id }`)
      .then((data) => data.json())
      .then(data => setProduct(data.product))
      .then(() => setIsLoading(false))
      .catch(setIsError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInCart(
      cartStore.filter(el => el._id === product?._id)
        .length !== 0 ? true : false
    )
  }, [cartStore, product?._id])

  const addToCart = (
    method: 'POST' | 'PUT', productForSend: TUserCart
  ) => {
    if (product) {
      getResponse('/api/cart', method, productForSend)
        .then(() => dispatch(addProduct({
          ...product,
          count: 1,
          sizes: size,
        })))
        .then(() => notifyInfo('Товар добавлен в корзину'))
        .catch(() => notifyInfo('Ошибка добавления товара'))
    };
  };

  const prepareCart = async () => {
    if (size.length === 0) {
      notifyInfo('Выберите размер');
      return;
    };

    const userId = session?.user?.id;

    if (product && userId) {
      const productForSend = {
        userId,
        goods: [{
          ...product,
          count: 1,
          sizes: size,
        }],
      };

      if (cartStore.length === 0) {
        addToCart('POST', productForSend)
      } else {
        addToCart('PUT', productForSend)
      }
    } else {
      notifyInfo('Войдите в аккаунт для сохранения товаров')
    }
  };

  return (
    <div className="container">
      <div className={ styles.product__container }>
        {
          product && (
            <>
              <div className={ styles.product }>
                <div className={ styles.product__bg }>
                  <NextImage
                    src={ product.images ? product.images[0].link : defaultImage }
                    width={ 310 }
                    height={ 370 }
                    alt="Товар"
                    priority
                    className={ styles.product__image }
                  />
                </div>
                <div className={ styles.product__content }>
                  <h2 className={ styles.product__title }>
                    { product.title }
                  </h2>
                  <p className={ styles.product__price }>
                    { formatPrice('ru').format(product.price) }
                  </p>
                  <ul className={ styles.product__info }>
                    <li className={ styles.product__info_item }>
                      <span className={ styles.product__info_item_item }

                      >
                        Категория:
                        <span className={ styles.product__info_name } >
                          { product.category }
                        </span>
                      </span>
                    </li>
                    <li className={ styles.product__info_item }>
                      <span className={ styles.product__info_item_item }>
                        Бренд:
                        <span className={ styles.product__info_name }>
                          { product.brand }
                        </span>
                      </span>
                    </li>
                  </ul>
                  <div className={ styles.product__stock }>
                    {
                      product.inStock ?
                        (
                          <span className={ styles.product__inStock_true }>
                            Есть в наличии
                          </span>
                        ) :
                        (
                          <span className={ styles.product__inStock_false }>
                            Нет в наличии
                          </span>
                        )
                    }
                  </div>
                  <ul className={ styles.product__sizes }>
                    {
                      product.sizes.map(el => {
                        return (
                          <li key={ el }
                            className={ styles.product__sizes_item }
                          >
                            <button
                              className={ styles.product__sizes_btn }
                              onClick={ () => setSize([el]) }
                            >
                              { el }
                            </button>
                          </li>
                        )
                      })
                    }
                  </ul>
                  {
                    product.inStock && (
                      <div className={ styles.product__buttons }>
                        {
                          inCart ?
                            (
                              <div className={ styles.product__buttons_item }
                              >
                                <Button title={ 'в корзине' } />
                              </div>
                            ) :
                            (
                              <>
                                <div className={ styles.product__buttons_item }
                                  onClick={ prepareCart }
                                >
                                  <Button title={ 'в корзину' } />
                                </div>
                                <div>
                                  <Button title={ 'в избранное' } />
                                </div>
                              </>
                            )
                        }
                      </div>
                    )
                  }
                </div>
              </div>
              <p className={ styles.product__description }>
                { product.description }
              </p>
            </>
          )
        }
        { isLoading && <ProductLoader /> }
        { isError && <h2>Что-то пошло не так...</h2> }
      </div>
    </div>
  )
};

export default LoadProduct;