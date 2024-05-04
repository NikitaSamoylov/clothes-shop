import styles from './Button.module.scss';

type TButton = {
  title: string;
};

const Button: React.FC<TButton> = ({ title }) => {
  return (
    <button className={ styles.btn }>
      { title }
    </button>
  )
};

export { Button };