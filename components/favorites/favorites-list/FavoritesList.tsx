'use client';
import { GrFormClose } from "react-icons/gr";
import { useAppSelector } from '@/lib/hooks';
import { Product } from '@/components/product-card';
import styles from './FavoritesList.module.scss';

const FavoritesList: React.FC = () => {
  const favoritesStore = useAppSelector(state => state.favoritesList);

  const removeProduct = () => {

  };

  return (
    <div className={ styles.favorites__list }>
      {
        favoritesStore.map(el => {
          return (
            <div className={ styles.favorites__wrapper }
              key={ el._id }
            >
              <div className={ styles.favorites__remove }
                onClick={ removeProduct }
              >
                <GrFormClose
                  color="grey"
                  size={ 18 }
                />
              </div>
              <Product
                data={ el }
              />
            </div>
          )
        })
      }
    </div>
  )
};

export { FavoritesList };