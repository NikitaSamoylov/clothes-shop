'use client';
import { ReactNode } from 'react';
import styles from './Popup.module.scss';

type PopupProps = {
  children?: ReactNode;
  setIsPopup: () => void;
  isPopup: boolean;
};

const Popup: React.FC<PopupProps> = (
  { children, setIsPopup, isPopup }
) => {

  return (
    <>
      {
        isPopup && (
          <section className={ styles.popup }>
            <div className={ styles.popup__wrapper }>
              <button onClick={ setIsPopup }
                className={ styles.popup__btn }
              >
                X
              </button>
              <div>
                { children }
              </div>
            </div>
          </section>
        )
      }
    </>
  )
};

export { Popup };