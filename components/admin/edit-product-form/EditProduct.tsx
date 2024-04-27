'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { Popup } from '@/components/popup';
import Select from 'react-select';
import { notifyError, notifyInfo } from '@/utils/notify';
import makeAnimated from 'react-select/animated';
import { TProduct } from '@/types/product';
import styles from './Edit.module.scss';

type PopUpProps = {
  setIsPopup: () => void;
  isPopup: boolean;
  productForEdit: TProduct | null;
  loadProduct: () => void;
};

type TPreloadedData = {
  _id: string;
  title: string;
  description: string;
  price: number;
  sizes: string[];
  category: string;
  inStock: boolean;
};

type TCategoryOptions = {
  value: string;
  label: string;
};

const categoryOptions: TCategoryOptions[] = [
  { value: 'майки', label: 'майки и футболки' },
  { value: 'штаны', label: 'брюки и джинсы' },
  { value: 'свитеры', label: 'свитера и кардиганы' },
  { value: 'куртки', label: 'куртки и пальто' },
];

type TinStockOptions = {
  value: string;
  label: string;
};

const inStockOptions: TinStockOptions[] = [
  { value: 'inStock', label: 'в наличии' },
  { value: 'outStock', label: 'нет в наличии' },
];

const EditProduct: React.FC<PopUpProps> = (
  { setIsPopup, isPopup, productForEdit, loadProduct }
) => {
  const animatedComponents = makeAnimated();

  const [preloadedData, setPreloadedData] = useState<TPreloadedData>();

  useEffect(() => {
    setPreloadedData({
      _id: productForEdit?._id || '',
      title: productForEdit?.title || '',
      description: productForEdit?.description || '',
      price: productForEdit?.price || 0,
      sizes: productForEdit?.sizes || [],
      category: productForEdit?.category || '',
      inStock: productForEdit?.inStock || true,
    })
  }, [productForEdit]);

  const onFieldsChange = (
    e: ChangeEvent<HTMLInputElement> |
      ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value)
    setPreloadedData((prev: any) => (
      { ...prev, [name]: value }
    ));
  };

  const onCategoryChange = (value: string) => {
    setPreloadedData((prev: any) => (
      { ...prev, category: value }
    ));
  };

  const inStockChange = (value: string) => {
    value === 'inStock' ?
      setPreloadedData((prev: any) => (
        { ...prev, inStock: true }
      )) :
      setPreloadedData((prev: any) => (
        { ...prev, inStock: false }
      ));
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/new-product', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: preloadedData?._id,
          title: preloadedData?.title,
          description: preloadedData?.description,
          price: preloadedData?.price,
          category: preloadedData?.category,
          inStock: preloadedData?.inStock,
        })
      });

      if (response.ok) {
        notifyInfo('Товар обновлен');
        response.json();
        setIsPopup();
        loadProduct()
      }
    } catch (e: any) {
      notifyError(e);
    };
  };

  return (
    <Popup
      setIsPopup={ setIsPopup }
      isPopup={ isPopup }
    >
      <form onSubmit={ onSubmit }
        className={ styles.editForm }
      >
        <label htmlFor="title"
          className={ styles.editForm__label }
        >
          название
          <input type="text"
            id='title'
            value={ preloadedData?.title }
            name="title"
            onChange={ (e) => onFieldsChange(e) }
            className={ styles.editForm__value }
          />
        </label>
        <label htmlFor="description"
          className={ styles.editForm__label }
        >
          описание
          <textarea rows={ 5 }
            spellCheck
            id='description'
            value={ preloadedData?.description }
            name='description'
            placeholder={ productForEdit?.description }
            className={
              `${ styles.editForm__value_descr }
              ${ styles.editForm__value }`
            }
            onChange={ (e) => onFieldsChange(e) }
          />
        </label>
        <label htmlFor="price"
          className={ styles.editForm__label }
        >
          цена
          <input type="number"
            id='price'
            value={ preloadedData?.price }
            name='price'
            className={ styles.editForm__value }
            min={ 1 }
            onChange={ (e) => onFieldsChange(e) }
          />
        </label>
        <span className={ styles.editForm__label }>
          категория
          <Select options={ categoryOptions }
            components={ animatedComponents }
            closeMenuOnSelect={ true }
            defaultValue={ {
              value: productForEdit?.category,
              label: productForEdit?.category
            } }
            placeholder={ 'выберите категорию' }
            styles={ {
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'grey',
                fontSize: '1.6rem',
                fontFamily: 'inherit'
              }),
              menuList: (baseStyles) => ({
                ...baseStyles,
                color: 'black',
                fontSize: '1.6rem'
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: 'black',
                fontSize: '1.6rem',
              }),
            } }
            onChange={ (options: any) => (
              onCategoryChange(options.value)
            ) }
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
          />
        </span>
        <span className={ styles.editForm__label }>
          в наличии
          <Select options={ inStockOptions }
            components={ animatedComponents }
            closeMenuOnSelect={ true }
            defaultValue={ {
              value: preloadedData?.inStock === true ? 'inStock' : 'outStock',
              label: preloadedData?.inStock === true ? 'в наличии' : 'нет в наличии'
            } }
            placeholder={ 'выберите категорию' }
            styles={ {
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'grey',
                fontSize: '1.6rem'
              }),
              menuList: (baseStyles) => ({
                ...baseStyles,
                color: 'black',
                fontSize: '1.6rem'
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: 'black',
                fontSize: '1.6rem',
              }),
            } }
            onChange={ (options: any) => (
              inStockChange(options.value
              )) }
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
          />
        </span>
        <div>
        </div>
        <button type="submit"
          className={ styles.editForm__btn }
        >
          Обновить данные
        </button>
      </form>
    </Popup>
  )
};

export { EditProduct };