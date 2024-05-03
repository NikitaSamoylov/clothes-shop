'use client';
import { ImCheckboxChecked } from "react-icons/im";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addFilter } from '@/lib/store/main-page-filters/main-page-filters';
import { addCategory } from "@/lib/store/main-page-filters/categories-filters";
import styles from './FiltersList.module.scss';

const brands: string[] = [
  'Pull & Bear',
  'Bershka',
  'Incity',
  'Incanto'
];

const categories: string[] = [
  'майки',
  'штаны',
  'толстовки',
  'куртки'
];

const FiltersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filtersStore = useAppSelector(state => state.mainPageFilters);
  const categoriesFiltersStore = useAppSelector(state => state.categoriesFilters);

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
        onClick={ () => dispatch(addCategory(el)) }
      >
        {
          categoriesFiltersStore.includes(el) ?
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

  return (
    <div className={ styles.filters }>
      {/* <h2 className="section-title">
        Фильтры
      </h2> */}
      <h3 className={ styles.filters__title }>
        Бренд
      </h3>
      <ul className={ styles.filters__list }>
        { brandsElements }
      </ul>
      <h3 className={ styles.filters__title }>
        Категории
      </h3>
      <ul className={
        `${ styles.filters__list }
        ${ styles.filters__list_categories }`
      }
      >
        { categoriesElements }
      </ul>
    </div>
  )
};

export { FiltersList };