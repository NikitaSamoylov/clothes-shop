'use client';
import { useEffect, useState } from 'react';
import { Product } from '../products-item';
import { useAppSelector } from '@/lib/hooks';
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
  const brandsFiltersStore = useAppSelector(state => state.mainPageFilters);

  const animatedComponents = makeAnimated();

  const limit = 12;

  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortPrice, setSortPrice] = useState<keyof typeof SORTBY>(SORTBY.asc);

  const setUpUrl = (skip = products.length, sort = sortPrice) => {
    const brandsQuery = brandsFiltersStore.length !== 0 ?
      brandsFiltersStore.join(',').replaceAll('&', '%26') :
      '';

    const url = `/api/new-product?page=${ skip }&limit=${ limit }&sort=${ sort }&brands=${ brandsQuery }`;
    console.log(url)
    getProducts(url)
      .then((data) => {
        skip === 0 ?
          setProducts(data) :
          setProducts(products => [...products, ...data])
      })
      .then(() => setError(false))
      .then(() => setLoading(false))
      .catch(catchError)

  };

  // const loadProducts = () => {
  //   const queryString = brandsFiltersStore.length !== 0 ?
  //     brandsFiltersStore.join(',') :
  //     '';
  //   const url = `/api/new-product?page=${ products.length }&limit=${ limit }&sort=${ sortPrice }&brands=${ queryString }`;
  //   getProducts(url)
  //     .then(renderElements)
  //     .catch(catchError)
  // };

  // const onBrandFilterChange = () => {
  // const queryString = brandsFiltersStore.length !== 0 ?
  //   brandsFiltersStore.join(',') :
  //   '';

  // setUpUrl(0)

  // const url = `/api/new-product?page=0&limit=${ limit }&sort=${ sortPrice }&brands=${ queryString }`;
  // getProducts(url)
  //   .then(setProducts)
  //   .then(() => setError(false))
  //   .then(() => setLoading(false))
  //   .catch(catchError)
  // };

  const onPriceSort = (value: keyof typeof SORTBY) => {
    setSortPrice(value);
    setUpUrl(0, value);
    // getSortedItems(value);
  };

  // const getSortedItems = (value: keyof typeof SORTBY) => {
  //   const queryString = brandsFiltersStore.length !== 0 ?
  //     brandsFiltersStore.join(',') :
  //     '';
  //   const url = `/api/new-product?page=0&limit=${ limit }&sort=${ value }&brands=${ queryString }`;
  //   getProducts(url)
  //     .then(setProducts)
  //     .then(() => setError(false))
  //     .then(() => setLoading(false))
  //     .catch(catchError)
  // };

  // const renderElements = (data: TProduct[]) => {
  //   setLoading(false);
  //   setError(false);
  //   products.length !== 0 ?
  //     setProducts(products => [...products, ...data]) :
  //     setProducts(data);
  // };

  const catchError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    // onBrandFilterChange();
    setUpUrl(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandsFiltersStore]);

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
        {
          products.length % 2 === 0 &&
            products.length >= limit ?
            (
              <button onClick={ () => setUpUrl() }
                // <button onClick={ () => loadProducts() }
                className={ styles.products__btn }
              >
                Загрузить еще
              </button>
            ) :
            null
        }
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
            defaultValue={ sortOptions[0] }
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


