'use client';
import { useEffect, useState } from 'react';
import { Product } from '../products-item';
import { TProduct } from '@/types/product';
import { getProducts } from '@/utils/request';
import ProductLoader from '@/components/preloaders/ProductLoader';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { notifyError } from '@/utils/notify';
import styles from './Products.module.scss';
import { BsMenuButton } from 'react-icons/bs';

type TSortOptions = {
  value: number;
  label: string;
};

const sortOptions: TSortOptions[] = [
  { value: 1, label: 'по возрастанию цены' },
  { value: -1, label: 'по убыванию цены' },
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const animatedComponents = makeAnimated();

  const itemsPerPage = 12;

  const loadProducts = () => {
    getProducts(`/api/new-product`)
      .then(renderElements)
      .catch(catchError)
  };

  const renderElements = (data: TProduct[]) => {
    setLoading(false);
    setError(false);
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

  const productsItems = !isLoading ||
    !isError ?
    (
      <>
        <ul className={ styles.products__list }>
          { elements }
        </ul>
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
          // onChange={ (options: any) => setCategory(options) }
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


