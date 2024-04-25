'use client';
import React, { useState, useEffect } from 'react';
import { ImgStorage } from '@/firebase';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { CgAttachment } from "react-icons/cg";
import { GoTrash } from "react-icons/go";
import { notifyInfo } from '@/utils/notify';
import { TProductImages } from '@/types/product';
import styles from './upload.module.scss';

type TUploadProps = {
  setProductImgUrl: (value: TProductImages) => void;
  clearImg: boolean;
  setClearImg: (value: boolean) => void;
};

const UploadImage: React.FC<TUploadProps> = (
  {
    setProductImgUrl,
    clearImg,
    setClearImg,
  }
) => {

  const [imgList, setImgList] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedList, setUploadedList] = useState<string[]>([]);

  useEffect(() => {
    clearImg ?
      setImgList([]) :
      clearImg
  }, [clearImg]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (clearImg) {
      setClearImg(false);
    };

    if (e.target.files) {
      Array.from(e.target.files)
        .map((el: File) => (
          uploadedList.includes(el.name) ?
            notifyInfo(`фото ${ el.name } уже загружено`) :
            setImgList((imgList: File[]) => [...imgList, el])
        ))
    };
  };

  const handleUpload = () => {
    setIsLoading(true);
    let fileRef: any;

    imgList.map(async (el) => {
      fileRef = ref(ImgStorage, el.name);
      await uploadBytesResumable(fileRef, el)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => setProductImgUrl({ link: url, name: el.name }))
          // .then((url) => setProductImgUrl(url))
        })
        .then(() => notifyInfo(`фото ${ el.name } загружено`))
        .then(() => setIsLoading(false))
        .then(() => (
          setUploadedList(
            (uploadedList) => [...uploadedList, el.name]
          )
        ))
        .then(() => setImgList([]))
        .catch(() => notifyInfo('ошибка загрузки фото'))
    })
  };

  const handleItemRemove = (item: string) => {
    setImgList(imgList => imgList.filter(el => el.name !== item))
  };

  return (
    <>
      <div className={ styles.upload }>
        <div className={ styles.upload__header }>
          <label className={ styles.upload__btn }>
            выберите фото
            <input type="file"
              style={ { display: 'none' } }
              multiple onChange={ handleChange } />
          </label>
          {
            imgList.length !== 0 ?
              (
                <input type='button'
                  onClick={ handleUpload }
                  className={
                    `${ styles.upload__btn } ${ styles.upload__btn_submit }`
                  }
                  value={ isLoading ? 'загрузка...' : 'загрузить' }
                />
              ) :
              null
          }
        </div>
        <ul className={ styles.upload__list }>
          {
            imgList.length !== 0 ?
              (
                imgList.map(el => {
                  return (
                    <li key={ el.name }
                      className={ styles.upload__item }
                    >
                      <CgAttachment />
                      <p className={ styles.upload__title }>
                        { el.name }
                      </p>
                      <GoTrash size={ 13 }
                        color={ 'grey' }
                        style={ { cursor: 'pointer' } }
                        onClick={ () => handleItemRemove(el.name) }
                      />
                    </li>
                  )
                })
              ) :
              null
          }
        </ul>
      </div>
    </>
  )
};

export const deleteUploadedImg = async (name: string) => {
  const desertRef = ref(ImgStorage, name);

  await deleteObject(desertRef);
};

export default UploadImage;