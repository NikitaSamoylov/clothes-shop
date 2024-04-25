'use client';
import { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useForm } from 'react-hook-form';
import { TProduct, TProductImages } from '@/types/product';
import UploadImage from '@/app/upload/upload';
import { notifyInfo } from '@/utils/notify';
import styles from './AddProduct.module.scss';

type TSizeOptions = {
  value: string;
  label: string;
};

const sizeOptions: TSizeOptions[] = [
  { value: 'm', label: 'm' },
  { value: 'l', label: 'l' },
  { value: 'xl', label: 'xl' },
  { value: 'xxl', label: 'xxl' },
];

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

const AddProductForm: React.FC = () => {
  const [productSize, setProductSize] = useState<TSizeOptions[] | []>([]);
  const [category, setCategory] = useState<TCategoryOptions | null>(null);
  const [productImgUrl, setProductImgUrl] = useState<TProductImages[]>([]);
  const [clearImg, setClearImg] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TProduct>({
    mode: 'onBlur'
  });

  const onReset = () => {
    reset();
    setProductSize([]);
    setProductImgUrl([]);
    setClearImg(true);
  };

  const onSubmit = async (data: TProduct) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/new-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title.trim(),
          description: data.description.trim(),
          price: +data.price,
          sizes: productSize.map(el => el.value),
          category: category ? category.value.trim() : null,
          images: productImgUrl,
          inStock: true,
        })
      });

      if (response.status === 200) {
        notifyInfo('Продукт добавлен');
        onReset();
      };

      if (response.status === 400) {
        notifyInfo('Такой продукт уже добавлен')
      };

      if (
        response.status !== 200 &&
        response.status !== 400
      ) {
        notifyInfo('что-то пошло не так')
      }

      setIsLoading(false);

    } catch (err: any) {
      console.log(err)
      setIsLoading(false);
    };
  };

  const animatedComponents = makeAnimated();

  return (
    <div className={ styles.addProduct__content }>
      <form onSubmit={ handleSubmit(onSubmit) }
        className={ styles.addProduct__form }
      >
        <label htmlFor="title"
          className={ styles.addProduct__input_label }
        >
          название товара
          <input type="text"
            id='title'
            className={ styles.addProduct__input }
            {
            ...register("title", {
              required: 'заполните поле',
              minLength: {
                value: 2,
                message: 'минимум 2 символа'
              }
            })
            }
          />
        </label>
        {
          errors?.title ?
            <span className={ styles.addProduct__input_error }>
              { errors.title.message }
            </span> :
            null
        }
        <label htmlFor="description"
          className={ styles.addProduct__input_label }
        >
          описание товара
          <textarea rows={ 4 }
            spellCheck
            id='description'
            className={
              `${ styles.addProduct__input } ${ styles.addProduct__input_descr }`
            }
            {
            ...register("description", {
              required: 'заполните поле',
              minLength: {
                value: 2,
                message: 'минимум 10 символов'
              }
            })
            }
          />
        </label>
        {
          errors?.description ?
            <span className={ styles.addProduct__input_error }>
              { errors.description.message }
            </span> :
            null
        }
        <label htmlFor="price"
          className={ styles.addProduct__input_label }
        >
          цена
          <input type="number"
            id='price'
            className={ styles.addProduct__input }
            min={ 1 }
            {
            ...register("price", {
              required: 'заполните поле',
              minLength: {
                value: 1,
                message: 'минимум 1 символ'
              },
            })
            }
          />
        </label>
        {
          errors?.price ?
            <span className={ styles.addProduct__input_error }>
              { errors.price.message }
            </span> :
            null
        }
        <span className={ styles.addProduct__size_title }>
          размеры
        </span>
        <div style={ { marginBottom: 10 } }>
          <Select options={ sizeOptions }
            components={ animatedComponents }
            closeMenuOnSelect={ false }
            isMulti
            placeholder={ 'выберите размеры' }
            noOptionsMessage={ () => 'варианты закончились' }
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
              multiValueLabel: (baseStyles) => ({
                ...baseStyles,
                color: 'black',
                fontSize: '1.4rem',
                backgroundColor: '#eeebeb'
              }),
              multiValueRemove: (baseStyles, state) => ({
                ...baseStyles,
                color: state.isFocused ? 'grey' : 'grey',
                backgroundColor: state.isFocused ? '#eeebeb' : '#eeebeb',
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
            onChange={ (options: any) => setProductSize(options) }
          />
        </div>
        <span className={ styles.addProduct__size_title }>
          категория
        </span>
        <Select options={ categoryOptions }
          components={ animatedComponents }
          closeMenuOnSelect={ true }
          placeholder={ 'выберите категорию' }
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
          onChange={ (options: any) => setCategory(options) }
        />
        <UploadImage
          setProductImgUrl={
            (value) => setProductImgUrl(
              productImgUrl => [...productImgUrl, value]
            )
          }
          clearImg={ clearImg }
          setClearImg={ (value: boolean) => setClearImg(value) }
        />
        <div>
          <button className={
            `${ styles.addProduct__btn } ${ styles.addProduct__btn_add } `
          }
            disabled={
              !isValid ||
              category === null ||
              productSize.length === 0 ||
              productImgUrl.length === 0
            }
          >
            {
              isLoading ?
                'Загрузка товара...' :
                ' Добавить товар'
            }
          </button>
          <button className={ styles.addProduct__btn }
            onClick={ onReset }
          >
            очистить форму
          </button>
        </div>
      </form>
    </div>
  )
};

export { AddProductForm };