import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { ProductsList } from '@/components/admin/products-list';
import { TAuthSessionUser } from '@/types/auth';
import styles from './Admin.module.scss';

const AdminPage: React.FC = async () => {
  const session: TAuthSessionUser | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/')
  };

  if (
    session &&
    session?.user?.role !== 'admin'
  ) {
    redirect('/')
  };

  return (
    <div className={ styles.admin }>
      <h3 className={ styles.admin__title }>
        Товаров пока нет
      </h3>
      <ProductsList />
    </div>
  )
};

export default AdminPage;