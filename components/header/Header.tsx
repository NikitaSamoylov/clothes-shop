
import Image from 'next/image';
import Link from 'next/link';
import Logo from './logo.png';
import { HeaderBtns } from './header-btns';
import { Nav } from '../nav';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className='container'>
      <div className={ styles.header }>
        <Link href='/'>
          <Image
            src={ Logo }
            width={ Logo.width }
            height={ Logo.height }
            alt='logo'
          />
        </Link>
        <Nav />
        <HeaderBtns />
      </div>
    </div>
  )
};

export { Header };