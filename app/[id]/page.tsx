'use client';
import { useState, useEffect } from "react";
import NextImage from 'next/image';
import { TProductForUpload } from "@/types/product";
import { formatPrice } from "@/utils/intl";
import { Button } from "@/components/button";
import ProductLoader from "@/components/preloaders/ProductLoader";
import styles from './page.module.scss';

import defaultImage from './default-image.png';

type TLoadProductProps = {
  params: {
    id: string;
  }
};

const LoadProduct: React.FC<TLoadProductProps> = (
  { params: { id } }
) => {
  const [product, setProduct] = useState<TProductForUpload>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  console.log(product)

  useEffect(() => {
    fetch(`/api/get-single-product?id=${ id }`)
      .then((data) => data.json())
      .then(data => setProduct(data.product))
      .then(() => setIsLoading(false))
      .catch(setIsError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    width={ 350 }
                    height={ 410 }
                    alt="Товар"
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
                  <div className={ styles.product__info }>
                    <span className={ styles.product__info_item }>
                      Категория:
                      <span className={ styles.product__info_name }>
                        { product.category }
                      </span>
                    </span>
                    <span className={ styles.product__info_item }>
                      Бренд:
                      <span className={ styles.product__info_name }>
                        { product.brand }
                      </span>
                    </span>
                  </div>
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
                  <div className={ styles.product__sizes }>
                    {
                      product.sizes.map(el => {
                        return (
                          <button key={ el }
                            className={ styles.product__sizes_item }
                          >
                            { el }
                          </button>
                        )
                      })
                    }
                  </div>
                  {
                    product.inStock && (
                      <div className={ styles.product__buttons }>
                        <div className={ styles.product__buttons_item }>
                          <Button title={ 'в корзину' } />
                        </div>
                        <div>
                          <Button title={ 'в избранное' } />
                        </div>
                      </div>
                    )
                  }
                </div>
                <div />
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