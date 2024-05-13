import Link from 'next/link';
import styles from './AdminMenu.module.scss';

const AdminMenu: React.FC = () => {
  return (
    <aside className={ styles.adminBlock }>
      <h2 className="section-title">
        Администратор
      </h2>
      <ul className={ styles.adminBlock__list }>
        <li className={ styles.adminBlock__item }>
          <Link href="/admin/orders"
            className={ styles.adminBlock__link }
          >
            Все заказы
          </Link>
        </li>
        <li className={ styles.adminBlock__item }>
          <Link href="/admin"
            className={ styles.adminBlock__link }
          >
            Все товары
          </Link>
        </li>
        <li className={ styles.adminBlock__item }>
          <Link href="/admin/add-product"
            className={ styles.adminBlock__link }
          >
            Добавить товар
          </Link>
        </li>
      </ul>
    </aside>
  )
};

export { AdminMenu };