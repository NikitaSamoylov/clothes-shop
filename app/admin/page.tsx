import styles from './Admin.module.scss';

const AdminPage: React.FC = () => {
  return (
    <div className={ styles.admin }>
      <h3 className={ styles.admin__title }>
        Товаров пока нет
      </h3>
    </div>
  )
};

export default AdminPage;