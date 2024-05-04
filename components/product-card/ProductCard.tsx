import NextImage from 'next/image';
import { TProduct } from '@/types/product';
import styles from './ProductCard.module.scss';

type TProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<TProductCardProps> = (
  { product }
) => {

  return (
    <li>
      {
        product.images ?
          (
            <NextImage
              src={ product.images[0] }
              width={ 110 }
              height={ 120 }
              alt='фото товара'
            />
          ) :
          null
      }
    </li>
  )
};

export { ProductCard };