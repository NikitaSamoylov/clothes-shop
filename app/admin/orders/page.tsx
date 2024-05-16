import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { OrdersList } from "@/components/admin/orders-list";
import { TAuthSessionUser } from "@/types/auth";
import styles from './Orders.module.scss';

const AdminOrders: React.FC = async () => {
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
      <OrdersList />
    </div>
  )
};

export default AdminOrders;