'use client';
import React from 'react';
import styles from './Clicker.module.scss';

type TCountProps = {
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
};

const Clicker: React.FC<TCountProps> = (
  { count, increaseCount, decreaseCount }
) => {

  return (
    <div className={ styles.clicker }>
      <button className={ styles.clicker__selector }
        onClick={ () => decreaseCount() }
      >
        -
      </button>
      <span className={ styles.clicker__count }>
        { count }
      </span>
      <button className={ styles.clicker__selector }
        onClick={ () => increaseCount() }
      >
        +
      </button >
    </div>
  )
};

export { Clicker };