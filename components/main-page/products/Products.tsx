'use client';
import { useEffect, useState, useCallback } from 'react';
import { Product } from '../products-item';
import { TProduct } from '@/types/product';
import { getProducts } from '@/utils/request';
import ProductLoader from '@/components/preloaders/ProductLoader';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { notifyError } from '@/utils/notify';
import styles from './Products.module.scss';

const SORTBY = {
  asc: 'asc',
  desc: 'desc',
} as const;

type TSortOptions = {
  value: keyof typeof SORTBY,
  label: string;
};


const sortOptions: TSortOptions[] = [
  { value: SORTBY.asc, label: 'по возрастанию цены' },
  { value: SORTBY.desc, label: 'по убыванию цены' },
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortPrice, setSortPrice] = useState<keyof typeof SORTBY>(SORTBY.asc);

  console.log(sortPrice)

  const limit = 12;

  const onPriceSort = (value: keyof typeof SORTBY) => {
    setSortPrice(value);

    if (value === SORTBY.asc) {
      setProducts(products => products?.sort((x, y) => x.price - y.price)
      );
    };

    if (value === SORTBY.desc) {
      setProducts(products => products?.sort((x, y) => y.price - x.price)
      );
    };

    // setSortPrice(+value);
  };

  const animatedComponents = makeAnimated();

  const loadProducts = async () => {
    const url = `/api/new-product?page=${ products.length }&limit=${ limit }&sort=${ sortPrice }`;
    await getProducts(url)
      .then(renderElements)
      .catch(catchError)
  };

  const renderElements = (data: TProduct[]) => {
    setLoading(false);
    setError(false);
    products.length !== 0 ?
      setProducts(products => [...products, ...data]) :
      setProducts(data);
  };

  const catchError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const elements = products ?
    (
      products.map((el: TProduct) => {
        return (
          <Product
            key={ el._id }
            data={ el }
          />
        )
      })
    ) :
    null;

  const isLoading = loading ?
    <ProductLoader /> :
    null;

  const isError = error ?
    <h2>Что-то пошло не так</h2> :
    null;

  const productsItems = !isLoading &&
    !isError ?
    (
      <>
        <ul className={ styles.products__list }>
          { elements }
        </ul>
        <button onClick={ () => loadProducts() }
          className={ styles.products__btn }
        >
          Загрузить еще
        </button>
      </>
    ) :
    null;

  return (
    <div style={ { width: '100%' } }>
      <div className={ styles.products__header }>
        <h2 className='section-title'
          style={ { marginBottom: 0 } }
        >
          Коллекции
        </h2>
        <div className={ styles.products__sort }>
          <Select options={ sortOptions }
            components={ animatedComponents }
            closeMenuOnSelect={ true }
            placeholder={ 'сортировать по цене' }
            styles={ {
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'grey',
                fontSize: '1.4rem'
              }),
              menuList: (baseStyles) => ({
                ...baseStyles,
                color: 'black',
                fontSize: '1.4rem'
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: 'black',
                fontSize: '1.4rem',
              }),
            } }
            theme={ (theme) => ({
              ...theme,
              borderRadius: 5,
              outline: 'none',
              colors: {
                ...theme.colors,
                primary25: '#c5e8f2',
                primary: '#c5e8f2',
              },
            }) }
            onChange={ (options: any) => onPriceSort(options.value) }
          />
        </div>
      </div>
      { productsItems }
      { isError }
      { isLoading }
    </div>
  )
};

export { Products };


