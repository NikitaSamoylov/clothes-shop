import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import styles from './AddProduct.module.scss';
import { redirect } from 'next/navigation';
import { AddProductForm } from '@/components/admin/add-product';

const AddProductPage: React.FC = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/')
  };

  return (
    <div className={ styles.addProduct }>
      <h3 className={ styles.addProduct__title }>
        Добавьте новый товар
      </h3>
      <AddProductForm />
    </div>
  )
};

export default AddProductPage;