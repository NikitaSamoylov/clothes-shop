'use client';
import { useSession } from "next-auth/react";
import { AiOutlineClose } from "react-icons/ai";
import { TUserCart, TProduct } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getResponse } from "@/utils/request";
import { addProduct } from "@/lib/store/cart/cart-slice";
import { notifyInfo } from "@/utils/notify";
import styles from './PopupSizes.module.scss';

type TPopupSizesProps = {
  sizes: string[];
  setIsPopup: () => void;
  data: TProduct;
};

const PopupSizes: React.FC<TPopupSizesProps> = (
  { sizes, setIsPopup, data }
) => {
  const { data: session } = useSession();

  const cartStore = useAppSelector(state => state.cartList);
  const dispatch = useAppDispatch();

  const addToCart = (
    method: 'POST' | 'PUT',
    productForSend: TUserCart,
    size: string[],
  ) => {
    getResponse('/api/cart', method, productForSend)
      .then(() => dispatch(addProduct({
        ...data,
        count: 1,
        sizes: size,
      })))
      .then(() => setIsPopup())
      .then(() => notifyInfo('Товар добавлен в корзину'))
      .catch(() => notifyInfo('Ошибка добавления товара'))
  };

  const prepareCart = async (size: string[]) => {
    const userId = session?.user?.id;

    if (data && userId) {
      const productForSend = {
        userId,
        goods: [{
          ...data,
          count: 1,
          sizes: size,
        }],
      };

      if (cartStore.length === 0) {
        addToCart('POST', productForSend, size)
      } else {
        addToCart('PUT', productForSend, size)
      }
    } else {
      notifyInfo('Войдите в аккаунт для сохранения товаров')
    }
  };

  return (
    <div className={ styles.popup__wrapper }>
      <div className={ styles.popup__header }>
        <h3 className={ styles.popup__title }>
          Размер
        </h3>
        <div className={ styles.popup__remove }
          onClick={ setIsPopup }
        >
          <AiOutlineClose
            color="grey"
            size={ 15 }
          />
        </div>
      </div>
      <ul className={ styles.popup__btns }>
        {
          sizes.map(el => {
            return (
              <li key={ el }
                className={ styles.popup__item }
              >
                <button className={ styles.popup__btn }
                  onClick={ () => prepareCart([el]) }
                >
                  { el }
                </button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
};

export { PopupSizes };