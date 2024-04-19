
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
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
        <Toaster
          position="top-center"
          reverseOrder={ false }
          gutter={ 8 }
          toastOptions={ {
            duration: 3000,
            style: {
              background: '#10708b',
              color: '#fff',
              fontSize: '16px',
            },
          } }
        />
      </div>
    </div>
  )
};

export { Header };