'use client';
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import styles from './HeaderBtns.module.scss';

const HeaderBtns: React.FC = () => {
  return (
    <div className={ styles.btn__list }>
      <button className={ styles.btn__item }>
        <AiOutlineHeart size={ 20 }
          color="grey"
        />
      </button>
      <button className={ styles.btn__item }>
        <Link href='/login'>
          <FaRegUser size={ 20 }
            color="grey"
          />
        </Link>
      </button>
      <button className={ styles.btn__item }>
        <BsBagCheck size={ 20 }
          color="grey"
        />
      </button>
    </div>
  )
};

export { HeaderBtns };