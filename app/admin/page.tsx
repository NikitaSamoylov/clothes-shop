import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import styles from './Admin.module.scss';
import { redirect } from 'next/navigation';

const AdminPage: React.FC = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/')
  };

  return (
    <div className={ styles.admin }>
      <h3 className={ styles.admin__title }>
        Товаров пока нет
      </h3>
    </div>
  )
};

export default AdminPage;