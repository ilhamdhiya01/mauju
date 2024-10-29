'use client';

import Button from '@components/ui/Button';
import Modal from '@components/ui/Modal';
import { toast } from '@components/ui/ToastProvider';
import { LIST_PRODUCT_KEY } from '@constants/queryKey';
import useIsMobile from '@hooks/shared/useIsMobile';
import { deleteProduct } from '@services/fetcher/product';
import useGlobalStore from '@stores/useGlobalStore';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

type ModalConfirmProps = {
  productId: string;
};

const ModalConfirmDelete = ({ productId }: ModalConfirmProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setShowModalConfirm, isShowModalConfirmDelete } = useGlobalStore();
  const isMobile = useIsMobile();

  const queryRefetch = useQueryClient();

  const { mutate: mutationDeleteProduct } = useMutation({
    onMutate: () => setIsLoading(true),
    mutationFn: deleteProduct,
    onError: () => {
      toast.error('Failed to delete product');
      setIsLoading(false);
    },
    onSuccess: () => {
      toast.success('Product successful deleted');
      queryRefetch.invalidateQueries([LIST_PRODUCT_KEY]);
      setShowModalConfirm(false);
      setIsLoading(false);
    },
  });

  const handleConfirmDelete = () => {
    mutationDeleteProduct(productId);
  };
  return (
    <>
      <Modal
        isOpen={isShowModalConfirmDelete}
        size={isMobile ? 'large' : 'normal'}
        title="Confirmation Delete Product"
        handleClose={() => setShowModalConfirm(false)}
      >
        <div className="flex justify-end w-full">
          <div className="inline-flex">
            <Button
              label="Cancel"
              variant="contained"
              color="neutral"
              type="button"
              onClick={() => setShowModalConfirm(false)}
            />
            <Button
              label="Delete"
              variant="contained"
              color="danger"
              isLoading={isLoading}
              onClick={handleConfirmDelete}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalConfirmDelete;
