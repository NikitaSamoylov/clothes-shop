import { ContactsForm } from '@/components/contacts';
import styles from './page.module.scss';

const Contacts: React.FC = () => {
  return (
    <section className='container'>
      <h2 className='section-title'
        style={ { textAlign: 'center' } }
      >
        Контакты
      </h2>
      <div
        style={ { display: 'flex', justifyContent: 'center' } }
      >
        <ContactsForm />
      </div>
    </section>
  )
};

export default Contacts;