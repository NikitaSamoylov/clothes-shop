import styles from './AddProduct.module.scss';

const AddProductPage: React.FC = () => {
  return (
    <div className={ styles.addProduct }>
      <h3 className={ styles.addProduct__title }>
        Добавьте новый товар
      </h3>
    </div>
  )
};

export default AddProductPage;