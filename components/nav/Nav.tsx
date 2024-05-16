import Link from 'next/link';
import styles from './Nav.module.scss';

const Nav: React.FC = () => {
  return (
    <div className='container'>
      <nav className={ styles.nav }>
        <ul className={ styles.nav__list }>
          <li className={ styles.nav__item }>
            <Link href='/contacts'
              className={ styles.nav__link }
            >
              контакты
            </Link>
          </li>
          {/* <li className={ styles.nav__item }>
            <Link href='/'
              className={ styles.nav__link }
            >
              доставка и оплата
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  )
};

export { Nav };