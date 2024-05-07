'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@/lib/hooks';
import { useAppSelector } from '@/lib/hooks';
import { IoIosArrowDown } from "react-icons/io";
import { Product } from '../products-item';
import { addProduct } from '@/lib/store/cart/cart-slice';
import { TProduct } from '@/types/product';
import { getProducts } from '@/utils/request';
import { FiltersList } from '../filters-list';
import ProductLoader from '@/components/preloaders/ProductLoader';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
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
  { value: SORTBY.asc, label: 'по нарастанию цены' },
  { value: SORTBY.desc, label: 'по убыванию цены' },
];

const Products: React.FC = () => {
  const brandsFiltersStore = useAppSelector(state => state.mainPageFilters);
  const categoriesFiltersStore = useAppSelector(state => state.categoriesFilters);

  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const animatedComponents = makeAnimated();

  const limit = 12;

  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortPrice, setSortPrice] = useState<keyof typeof SORTBY>(SORTBY.asc);
  const [isFilters, setIsFilters] = useState(false);

  const setUpUrl = (skip = products.length, sort = sortPrice) => {
    skip === 0 ?
      setLoading(true) :
      skip

    const brandsQuery = brandsFiltersStore.length !== 0 ?
      brandsFiltersStore.join(',').replaceAll('&', '%26') :
      '';

    const categoriesQuery = categoriesFiltersStore.length !== 0 ?
      categoriesFiltersStore.join(',') :
      '';

    const url = `/api/new-product?page=${ skip }&limit=${ limit }&sort=${ sort }&brands=${ brandsQuery }&categories=${ categoriesQuery }`;

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

  const onPriceSort = (value: keyof typeof SORTBY) => {
    setIsFilters(false);
    setSortPrice(value);
    setUpUrl(0, value);
  };

  const catchError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    setUpUrl(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandsFiltersStore, categoriesFiltersStore]);

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
          <div style={ { position: 'relative' } }>
            <div className={ styles.products__filters_mobile }
              onClick={ () => setIsFilters(isFilters => !isFilters) }
            >
              <span className={ styles.products__filters_title }>
                Фильтры
              </span>
              <IoIosArrowDown
                size={ 20 }
                color='lightgrey'
              />
            </div>
            {
              isFilters && (
                <div className={ styles.products__filters_list }>
                  <FiltersList />
                </div>
              )
            }
          </div>
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
            isDisabled={ isFilters ? true : false }
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


