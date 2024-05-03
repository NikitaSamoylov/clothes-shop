import { FiltersList } from "../filters-list";
import styles from './Filters.module.scss';

const Filters: React.FC = () => {

  return (
    <div className={ styles.filters }>
      <h2 className="section-title">
        Фильтры
      </h2>
      <FiltersList />
    </div>
  )
};

export { Filters };