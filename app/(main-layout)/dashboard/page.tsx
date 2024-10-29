'use client';

import ModalAddProduct from '@components/module/dashboard/Modal/ModalAddProduct';
import ModalConfirmDelete from '@components/module/dashboard/Modal/ModalConfirmDelete';
import ModalUpdateProduct from '@components/module/dashboard/Modal/ModalUpdateProduct';
import ProductTable from '@components/module/dashboard/Table';
import React, { useState } from 'react';

const DashboardPage = () => {
  const [id, setId] = useState('');

  const handleGetId = (productId: string) => {
    setId(productId);
  };

  return (
    <>
      <div className="w-full h-full mt-5 md:mt-10">
        <div className="md:flex md:justify-center">
          <div className="md:max-w-[60%] w-full">
            <ProductTable onGetId={(productId) => handleGetId(productId)} />
          </div>
        </div>
      </div>
      <ModalAddProduct />
      <ModalUpdateProduct productId={id} />
      <ModalConfirmDelete productId={id} />
    </>
  );
};

export default DashboardPage;
