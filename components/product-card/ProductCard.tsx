import NextImage from 'next/image';
import { TProduct } from '@/types/product';
import styles from './ProductCard.module.scss';

type TProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<TProductCardProps> = (
  { product }
) => {
  console.log(product)

  return (
    <li>
      {
        product.images ?
          (
            <NextImage
              src={ product.images[0] }
              width={ 110 }
              height={ 120 }
              // width="0"
              // height="0"
              // style={ { width: '80px', height: 'auto' } }
              alt='фото товара'
            />
          ) :
          null
      }
    </li>
  )
};

export { ProductCard };