import NextImage from 'next/image';
import Link from 'next/link';
import { TProduct } from '@/types/product';
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { formatPrice } from '@/utils/intl';
import styles from './ProductsItem.module.scss';

import defaultImg from './default-img.png';

type TProductProps = {
  data: TProduct;
};

const Product: React.FC<TProductProps> = (
  { data }
) => {

  return (
    <li>
      <div className={ styles.productsItem__img_wrapper }>
        <Link href="/">
          <NextImage
            src={
              data.images ?
                data.images[0].link :
                defaultImg
            }
            width={ 275 }
            height={ 308 }
            alt={ 'фото товара' }
            priority
            className={ styles.productsItem__img }
          />
        </Link>
      </div>
      <div className={ styles.productsItem__info }>
        <span className={ styles.productsItem__price }>
          { formatPrice('ru').format(data.price) }
        </span>
        <div className={ styles.productsItem__btns }>
          <button className={
            `${ styles.productsItem__btns_item }
              ${ styles.productsItem__btns_wish }`
          }>
            <AiOutlineHeart
              color='grey'
              size={ 19 }
            />
          </button>
          <button>
            <BsBagCheck
              color='grey'
              size={ 17 }
            />
          </button>
        </div>
      </div>
      <h4 className={ styles.productsItem__title }>
        { data.title }
      </h4>
    </li>
  )
};

export { Product };