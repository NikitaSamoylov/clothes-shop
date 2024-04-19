'use client';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { FiUserCheck } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import styles from './HeaderBtns.module.scss';

const HeaderBtns: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className={ styles.btn__list }>
      <button className={ styles.btn__item }>
        <AiOutlineHeart size={ 20 }
          color="grey"
        />
      </button>
      {
        status !== 'authenticated' ?
          (
            <button className={ styles.btn__item }>
              <Link href='/login'>
                <FiUser size={ 20 }
                  color="grey"
                />
              </Link>
            </button>
          ) :
          (
            <button className={ styles.btn__item }>
              <Link href='/login'>
                <FiUserCheck size={ 20 }
                  color="#308DA1"
                />
              </Link>
            </button>
          )
      }
      <button className={ styles.btn__item }
        onClick={ () => signOut() }
      >
        <BsBagCheck size={ 18 }
          color="grey"
        />
      </button>
    </div>
  )
};

export { HeaderBtns };