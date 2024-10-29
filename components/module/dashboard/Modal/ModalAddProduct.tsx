'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Modal from '@components/ui/Modal';
import SelectInput from '@components/ui/SelectInput';
import TextArea from '@components/ui/Textarea';
import { toast } from '@components/ui/ToastProvider';
import { DEFAULT_VALUE_ADD_PRODUCT_FORM } from '@constants/initialValue';
import { LIST_PRODUCT_KEY } from '@constants/queryKey';
import AddProductForm from '@constants/schema/validation/AddProductForm';
import { yupResolver } from '@hookform/resolvers/yup';
import useCategoryList from '@hooks/shared/useCategoryList';
import useIsMobile from '@hooks/shared/useIsMobile';
import { createProduct } from '@services/fetcher/product';
import useGlobalStore from '@stores/useGlobalStore';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

type TypeAddProductForm = {
  title: string;
  price: string;
  description: string;
  category: string;
};

const ModalAddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setShowModalAdd, isShowModalAddProduct } = useGlobalStore();
  const { categories } = useCategoryList();
  const isMobile = useIsMobile();

  const queryRefetch = useQueryClient();

  const [categorySelected, setCategorySelected] = useState<OptionItem>({
    label: '',
    value: '',
  });

  const categoryOptions = useMemo(() => {
    if (categories) {
      return categories.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));
    }
    return [];
  }, [categories]);

  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<TypeAddProductForm>({
    mode: 'onBlur',
    resolver: yupResolver(AddProductForm as any),
    defaultValues: DEFAULT_VALUE_ADD_PRODUCT_FORM,
  });

  const title = watch('title');
  const price = watch('price');
  const description = watch('description');

  const handelSelectCategory = useCallback(
    (val: OptionItem) => {
      setValue('category', val.value);
      setCategorySelected(val);
    },
    [setValue]
  );
  const { mutate: mutationCreateProduct } = useMutation({
    onMutate: () => setIsLoading(true),
    mutationFn: createProduct,
    onError: () => {
      toast.error('Failed to add product');
      setIsLoading(false);
    },
    onSuccess: () => {
      toast.success('Product successful added');
      queryRefetch.invalidateQueries([LIST_PRODUCT_KEY]);
      setShowModalAdd(false);
      setIsLoading(false);
      reset();
    },
  });

  const handleCloseModal = () => {
    reset();
    setShowModalAdd(false);
  };

  const onSubmit = () => {
    mutationCreateProduct({
      title,
      description,
      price: Number(price),
      categoryId: Number(categorySelected.value),
      images: ['https://placeimg.com/640/480/any'],
    });
  };
  return (
    <>
      <Modal
        isOpen={isShowModalAddProduct}
        size={isMobile ? 'large' : 'normal'}
        title="Add Product"
        handleClose={handleCloseModal}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <Input
            label="Product Name *"
            color="secondary"
            placeholder="Input product name"
            value={title}
            errorMessage={errors.title?.message}
            onChange={({ target }) => setValue('title', target.value)}
            fullWidth
          />
          <Input
            label="Product Price *"
            color="secondary"
            placeholder="Input product price"
            type="number"
            value={price}
            errorMessage={errors.price?.message}
            onChange={({ target }) => setValue('price', target.value)}
            fullWidth
          />
          <SelectInput
            color="secondary"
            label="Categories *"
            placeholder="Select category"
            value={categorySelected.value}
            errorMessage={errors.category?.message}
            onChange={(val) => handelSelectCategory(val as OptionItem)}
            options={categoryOptions}
            fullWidth
          />
          <TextArea
            label="Description"
            inputMode="text"
            color="secondary"
            value={description}
            errorMessage={errors.description?.message}
            onChange={({ target }) => setValue('description', target.value)}
            placeholder="Input product description"
          />
          <div className="flex justify-end">
            <div className="inline-flex">
              <Button
                label="Cancel"
                variant="contained"
                color="neutral"
                type="button"
                onClick={handleCloseModal}
              />
              <Button
                label="Save"
                variant="contained"
                color="secondary"
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalAddProduct;
