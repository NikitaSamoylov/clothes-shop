import { OrdersList } from "@/components/admin/orders-list";
import styles from './Orders.module.scss';

const AdminOrders: React.FC = () => {
  return (
    <div className={ styles.admin }>
      <OrdersList />
    </div>
  )
};

export default AdminOrders;