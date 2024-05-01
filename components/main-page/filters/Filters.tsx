'use client';
import { ImCheckboxChecked } from "react-icons/im";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addFilter } from '@/lib/store/main-page-filters/main-page-filters';
import styles from './Filters.module.scss';

const brands: string[] = [
  'Pull & Bear',
  'Bershka',
  'Incity',
  'Incanto'
];

const categories: string[] = [
  'футболки',
  'штаны',
  'свитеры',
  'куртки'
];

const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const filtersStore = useAppSelector(state => state.mainPageFilters);

  const brandsElements = brands.map(el => {
    return (
      <li key={ el }
        className={ styles.filters__item }
        onClick={ () => dispatch(addFilter(el)) }
      >
        {
          filtersStore.includes(el) ?
            (
              <div className={ styles.filters__checkbox_checked }>
                <ImCheckboxChecked
                  size={ 15 } color={ '#378da5' }
                />
              </div>
            ) :
            (
              <div className={ styles.filters__checkbox_unchecked }>
              </div>
            )
        }
        <button className={ styles.filters__name }>
          { el }
        </button>
      </li>
    )
  });

  const categoriesElements = categories.map(el => {
    return (
      <li key={ el }
        className={ styles.filters__item }
      >
        {
          filtersStore.includes(el) ?
            (
              <div className={ styles.filters__checkbox }>
                <ImCheckboxChecked
                  size={ 15 } color={ '#378da5' }
                />
              </div>
            ) :
            (
              <div className={ styles.filters__checkbox_unchecked }>
              </div>
            )
        }
        <button className={ styles.filters__name }>
          { el }
        </button>
      </li>
    )
  });

  return (
    <div className={ styles.filters }>
      <h2 className="section-title">
        Фильтры
      </h2>
      <h3 className={ styles.filters__title }>
        Бренд
      </h3>
      <ul className={ styles.filters__list }>
        { brandsElements }
      </ul>
      <h3 className={ styles.filters__title }>
        Категории
      </h3>
      <ul className={ styles.filters__list }>
        { categoriesElements }
      </ul>
    </div>
  )
};

export { Filters };