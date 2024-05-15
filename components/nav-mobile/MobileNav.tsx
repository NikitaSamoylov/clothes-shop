import Link from 'next/link';
import { IoMdClose } from "react-icons/io";
import styles from './MobileNav.module.scss';

type TMobileNavProps = {
  width: string;
  setMobileMenu: () => void;
  mobileMenu: boolean;
};

const MobileNav: React.FC<TMobileNavProps> = (
  { width, setMobileMenu, mobileMenu }
) => {

  return (
    <div className={ styles.mobileNav }
      style={ { width: width } }
    >
      <button className={ styles.mobileNav__btn }
        onClick={ setMobileMenu }
      >
        <IoMdClose size={ 25 } />
      </button>
      {
        mobileMenu && (
          <ul className={ styles.mobileNav__list }>
            <Link href="/contacts"
              className={ styles.mobileNav__link }
              onClick={ setMobileMenu }
            >
              <li className={ styles.mobileNav__item }>
                Контакты
              </li>
            </Link>
            <Link href="/"
              className={ styles.mobileNav__link }
              onClick={ setMobileMenu }
            >
              <li className={ styles.mobileNav__item }>
                Доставка и оплата
              </li>
            </Link>
          </ul>
        )
      }
    </div>
  )
};

export { MobileNav };