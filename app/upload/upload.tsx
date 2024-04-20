'use client';
import React, { useState } from 'react';
import { ImgStorage } from '@/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Upload, Button, Flex, ConfigProvider } from 'antd';
import { UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { notifyInfo } from '@/utils/notify';

type TUploadProps = {
  setProductImgUrl: (value: any) => void;
};

const UploadImage: React.FC<TUploadProps> = (
  { setProductImgUrl }
) => {

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [infoUpload, setInfoUpload] = useState<boolean>(false);

  const addFilesOnUploading = (info: any) => {
    info.fileList = []
    info.file.status === 'done' ?
      setFileList(
        (fileList: any) => [...fileList, info]
      ) :
      info.file.status
  };

  const deleteUploadedImg = async (info: UploadFile) => {
    setFileList(
      fileList.filter(
        (el: any) => el.file.name !== info.name
      )
    );
  };

  const uploadFiles = () => {
    let fileRef: any;
    fileList.map(async (el) => {
      fileRef = ref(ImgStorage, el.file.name);
      await uploadBytesResumable(fileRef, el.file.originFileObj)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => setProductImgUrl(url))
            .then(() => setFileList([]))
            .then(() => notifyInfo('фото загружены'))
            .then(() => setInfoUpload(infoUpload => !infoUpload))
        })
        .catch(() => notifyInfo('ошибка загрузки фото'))
    })
  };

  return (
    <Flex style={ { marginTop: '25px' } }>
      <Upload
        onChange={ addFilesOnUploading }
        onRemove={ deleteUploadedImg }
        showUploadList={ fileList.length !== 0 ? true : false }
      >
        <ConfigProvider
          theme={ {
            components: {
              Button: {
                defaultHoverBorderColor: 'grey',
                defaultHoverColor: 'black'
              },
            },
          } }
        >
          <Button icon={ <UploadOutlined /> }>
            Добавьте фото
          </Button>
          {
            infoUpload ?
              (
                <span style={ {
                  marginLeft: '15px', color: '#10708b'
                } }>
                  Фото загружены
                </span>
              ) :
              null
          }
        </ConfigProvider>
      </Upload>
      {
        fileList.length !== 0 ?
          (
            <ConfigProvider
              theme={ {
                components: {
                  Button: {
                    defaultHoverBorderColor: 'grey',
                    defaultHoverColor: 'black'
                  },
                },
              } }
            >
              <Button className='button'
                style={ { marginLeft: 10 } }
                onClick={ uploadFiles }
              >
                загрузить
              </Button>
            </ConfigProvider>
          ) :
          null
      }
    </Flex>
  )
}

export default UploadImage;