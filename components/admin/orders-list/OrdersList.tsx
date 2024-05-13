'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { TableStyles } from 'react-data-table-component';
import { getResponse } from '@/utils/request';
import { TOrder } from '@/types/product';
import styles from './OrdersList.module.scss';

const customStyles: TableStyles | undefined = {
  rows: {
    style: {
      minHeight: '72px',
      justifyContent: 'center',
      paddingTop: '7px',
      paddingBottom: '7px',
      overflowX: 'auto'
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      fontSize: '1.6rem',
      fontWeight: 'bold',
      justifyContent: 'center'
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      fontSize: '1.6rem',
      maxWidth: '218px',
      justifyContent: 'space-around',
      textAlign: 'left'
    },
  },
  pagination: {
    style: {
      paddingTop: '30px',
      fontFamily: 'inherit',
      fontSize: '1.4rem',
      color: 'grey',
    },
    pageButtonsStyle: {
      color: 'grey',
      fill: 'none',
      backgroundColor: 'lightgrey'
    },
  },
};

const paginationComponentOptions = {
  rowsPerPageText: 'Строк на странице',
  rangeSeparatorText: 'из',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'все',
};

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);

  const loadProduct = () => {
    getResponse(`/api/get-all-orders`, 'GET', null)
      .then((data) => renderElements(data.orders))
      .catch(catchError)
  };

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderElements = (data: TOrder[]) => {
    setLoading(false);
    setError(false);
    // setOrders(data);
    setTableData(data.map(el => (
      el.orders.map(item => {
        return {
          client: el.userEmail,
          price: item.price,
          date: <p style={ { maxWidth: 200 } }>
            { (new Date(item.date).toLocaleString()) }
          </p>,
          goods: item.goods.map(el => {
            return <p key={ el._id }>
              { el.title }
            </p>
          }),
        }
      })
    )).flat());
  };

  // const tableData = orders.map(el => (
  //   el.orders.map(item => {
  //     return {
  //       client: el.userEmail,
  //       price: item.price,
  //       date: item.date,
  //       goods: item.goods,
  //     }
  //   })
  // )).flat();

  const catchError = () => {
    setLoading(false);
    setError(true);
  };

  const columns = [
    {
      name: 'дата',
      grow: 0,
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: 'Клиент',
      selector: (row: any) => row.client,
      sortable: true,
    },
    {
      name: 'Цена, руб.',
      selector: (row: any) => row.price,
      sortable: true,
    },
    {
      name: 'Товары',
      selector: (row: any) => row.goods,
      sortable: true,
    },
  ];

  const elements = (
    <DataTable
      columns={ columns }
      data={ tableData.flat() }
      customStyles={ customStyles }
      progressPending={ loading }
      pagination
      paginationComponentOptions={
        paginationComponentOptions
      }
      progressComponent={
        <h2 style={ { textAlign: 'center' } }>
          Загрузка...
        </h2>
      }
      noDataComponent={
        <h2 style={ { textAlign: 'center' } }>
          Нет данных для отображения
        </h2>
      }
    />
  );

  const isLoading = loading ?
    <h2>Загрузка...</h2> :
    null;

  const isError = error ?
    <h2>Что-то пошло не так</h2> :
    null;

  const productsItems = !isLoading &&
    !isError ?
    elements :
    null;

  return (
    <div className={ styles.orders__wrapper }>
      <h3 style={ {
        fontSize: '20px',
        margin: '0 auto 20px auto',
        textAlign: 'center'
      } }>
        {
          tableData.length === 0 ?
            'Заказов пока нет' :
            `Всего заказов: ${ tableData.length }`
        }
      </h3>
      { loading }
      { error }
      { productsItems }
    </div>
  )
};

export { OrdersList };



