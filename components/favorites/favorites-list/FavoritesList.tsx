'use client';
import { useSession } from "next-auth/react";
import { GrFormClose } from "react-icons/gr";
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { deleteFavorites, deleteAll } from "@/lib/store/favorites/favorites.slice";
import { BsChatHeart } from "react-icons/bs";
import { Product } from '@/components/product-card';
import { getResponse } from "@/utils/request";
import { notifyInfo } from "@/utils/notify";
import styles from './FavoritesList.module.scss';

const FavoritesList: React.FC = () => {
  const { data: session } = useSession();

  const favoritesStore = useAppSelector(state => state.favoritesList);
  const dispatch = useAppDispatch();

  const removeFavoritesCollection = () => {
    getResponse(
      `/api/favorites?user=${ session?.user?.id }`,
      'DELETE',
      null
    )
      .then(() => dispatch(deleteAll()))
      .then(() => notifyInfo('Товар удален'))
      .catch(() => notifyInfo('Ошибка удаления товара'))
  };

  const removeProduct = (id: string) => {
    if (favoritesStore.length === 1) {
      removeFavoritesCollection();
    } else {
      getResponse(
        `/api/update-favorites?user=${ session?.user?.id }&id=${ id }`,
        'DELETE',
        null
      )
        .then(() => dispatch(deleteFavorites(id)))
        .then(() => notifyInfo('Товар удален'))
        .catch(() => notifyInfo('Ошибка удаления товара'))
    }
  };

  return (
    <>
      <h2 className="section-title"
        style={ { textAlign: 'center' } }
      >
        {
          favoritesStore.length === 0 ?
            'В избранном товаров нет' :
            'Избранное'
        }
      </h2>
      <div className={ styles.favorites__list }>
        {
          favoritesStore.length === 0 ?
            (
              <div className={ styles.favorites__empty }>
                <BsChatHeart
                  color="rgb(147 200 211)"
                  size="80"
                />
              </div>
            ) :
            favoritesStore.map(el => {
              return (
                <div className={ styles.favorites__wrapper }
                  key={ el._id }
                >
                  <div className={ styles.favorites__remove }
                    onClick={ () => removeProduct(el._id) }
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
    </>
  )
};

export { FavoritesList };