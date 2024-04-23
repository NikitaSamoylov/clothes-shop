
import { RiDeleteBack2Line } from "react-icons/ri";
import styles from './Search.module.scss';

type ProductSearchProps = {
  searchValue: string;
  addSearchValue: (value: string) => void;
  clearSearch: () => void;
};

const ProductSearch: React.FC<ProductSearchProps> = (
  { searchValue, addSearchValue, clearSearch }
) => {
  return (
    <div className={ styles.search }>
      <input type="text"
        className={ styles.search__input }
        onChange={ (e) => addSearchValue(e.target.value) }
        value={ searchValue }
      />
      {
        searchValue !== '' ?
          <RiDeleteBack2Line
            size={ 15 }
            color="grey"
            style={ {
              position: 'absolute',
              right: '6px',
              top: '7px',
              cursor: 'pointer',
              transition: '.3s'
            } }
            onClick={ () => clearSearch() }
          /> :
          null
      }
    </div>
  )
};

export { ProductSearch };