'use client';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import DataTable from 'react-data-table-component';
import { TableStyles } from 'react-data-table-component';
// import { defaultThemes } from 'react-data-table-component';
import { uploadProducts } from '@/utils/request';
import { TProduct } from '@/types/product';
import { ProductSearch } from '../products-search';
import styles from './ProductsList.module.scss';
import { notifyInfo, notifyError } from '@/utils/notify';

const defaultThemes = {
  selected: {
    default: '#77cfed',
    text: '#FFFFFF',
  }
};

const customStyles: TableStyles | undefined = {
  rows: {
    style: {
      minHeight: '72px',
      justifyContent: 'center',
      paddingTop: '7px',
      paddingBottom: '7px'
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
      backgroundColor: 'transparent'
    },
  },
};

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');

  const clearSearch = () => {
    setSearchValue('');
  };

  const addSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const filteredData = searchValue === '' ?
    products :
    products.filter(
      el => (
        el.title.toLowerCase().includes(searchValue.toLowerCase()
        ))
    )

  const getProducts = () => {
    setPending(true)
    uploadProducts()
      .then((data) => setProducts(data.products))
      .then(() => setPending(false))
  };

  useEffect(() => {
    getProducts()
  }, []);

  const columns = [
    {
      name: 'фото',
      grow: 0,
      cell: (row: any) => (
        <NextImage
          height={ 70 }
          width={ 60 }
          alt={ 'товар' }
          src={ row.image }
        />
      ),
    },
    {
      name: 'Название',
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: 'Цена, руб.',
      selector: (row: any) => row.price,
      sortable: true,
    },
    {
      name: 'Категория',
      selector: (row: any) => row.category,
      sortable: true,
    },
    {
      name: 'Действия',
      button: true,
      selector: (row: any) => row.actions,
    },
  ];

  const removeProduct = async (
    value: string | undefined
  ) => {
    try {
      const response = await fetch(`/api/new-product?id=${ value }`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('ошибка удаления товара')
      };

      if (response.ok) {
        notifyInfo('Товар удален');
        getProducts();
      };

    } catch (e: any) {
      notifyError(e)
    }
  };

  const tableData = filteredData.map((el: TProduct, index: number) => {
    return {
      id: index,
      title: el.title,
      price: el.price,
      stock: el.inStock,
      category: el.category,
      actions: <button onClick={ () => removeProduct(el._id) }>
        Удалить
      </button>,
      image: el.images ? el.images[0] : null,
    }
  });

  const paginationComponentOptions = {
    rowsPerPageText: 'Строк на странице',
    rangeSeparatorText: 'из',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'все',
  };

  return (
    <>
      <ProductSearch
        searchValue={ searchValue }
        addSearchValue={ (value: string) => addSearchValue(value) }
        clearSearch={ () => clearSearch() }
      />
      <DataTable
        columns={ columns }
        data={ tableData }
        customStyles={ customStyles }
        progressPending={ pending }
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
    </>
  )
};

export { ProductsList };