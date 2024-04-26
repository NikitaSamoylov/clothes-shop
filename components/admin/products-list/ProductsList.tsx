'use client';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import DataTable from 'react-data-table-component';
import { TableStyles } from 'react-data-table-component';
import { uploadProducts } from '@/utils/request';
import { LuTrash2 } from "react-icons/lu";
import { RiEditLine } from "react-icons/ri";
import { TProduct } from '@/types/product';
import { ProductSearch } from '../products-search';
import { deleteUploadedImg } from '@/app/upload/upload';
import { notifyInfo, notifyError } from '@/utils/notify';
import { EditProduct } from '../edit-product-form';
import styles from './ProductsList.module.scss';

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
      backgroundColor: 'transparent'
    },
  },
};

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [removeBtnLoading, setRemoveBtnLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [productForEdit, setProductForEdit] = useState<TProduct | null>(null);

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
    getProducts();
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
      name: 'Наличие',
      selector: (row: any) => row.inStock,
      sortable: true,
    },
    {
      name: 'Действия',
      button: true,
      selector: (row: any) => row.actions,
    },
  ];

  const removeProduct = async (
    value: TProduct
  ) => {
    setRemoveBtnLoading(true);

    try {
      const response = await fetch(`/api/new-product?id=${ value._id }`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('ошибка удаления товара')
      };

      if (response.ok) {
        value.images?.map(async (el) => (
          await deleteUploadedImg(el.name)
        ));
        notifyInfo('Товар удален');
        setRemoveBtnLoading(false);
        getProducts();
      };

    } catch (e: any) {
      setRemoveBtnLoading(false);
      notifyError(e)
    }
  };

  const addProductForEdit = (product: TProduct) => {
    setProductForEdit(product);
    setIsPopup(isPopup => !isPopup);
  };

  const tableData = filteredData.map((el: TProduct, index: number) => {
    return {
      id: index,
      title: el.title,
      price: el.price,
      stock: el.inStock,
      inStock: el.inStock ? 'да' : 'нет',
      category: el.category,
      actions: <div style={ { display: 'flex' } }>
        <button onClick={ () => removeProduct(el) }
          style={ { marginRight: '15px' } }
          disabled={ removeBtnLoading ? true : false }
        >
          <LuTrash2 size={ 17 } color="grey" />
        </button>
        <button
          onClick={
            () => addProductForEdit(el)
          }
        >
          <RiEditLine size={ 17 } color="grey" />
        </button>
      </div>,
      image: el.images ? el.images[0].link : null,
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
        addSearchValue={
          (value: string) => addSearchValue(value)
        }
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
      <EditProduct
        setIsPopup={ () => setIsPopup(isPopup => !isPopup) }
        isPopup={ isPopup }
        productForEdit={ productForEdit }
        getProducts={ () => getProducts() }
      />
    </>
  )
};

export { ProductsList };