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

const filters = [
  { value: 'Марка', items: brands },
  { value: 'Категории', items: categories },
];

const Filters: React.FC = () => {

  const elements = filters.map(el => {
    return (
      <div key={ el.value }>
        <h3 className={ styles.filters__title }>
          { el.value }
        </h3>
        <ul className={ styles.filters__list }>
          {
            el.items.map(el => {
              return (
                <li key={ el }
                  className={ styles.filters__item }
                >
                  <div
                    className={ styles.filters__checkbox }
                  ></div>
                  <span className={ styles.filters__name }>
                    { el }
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  });

  return (
    <div className={ styles.filters }>
      <h2 className="section-title">
        Фильтры
      </h2>
      { elements }
    </div>
  )
};

export { Filters };