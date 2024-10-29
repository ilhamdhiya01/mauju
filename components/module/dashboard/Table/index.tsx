/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo, useState } from 'react';
import Table from '@components/ui/Table';
import Button from '@components/ui/Button';
import { useQuery } from 'react-query';
import { LIST_PRODUCT_KEY } from '@constants/queryKey';
import { productList } from '@services/fetcher/product';
import moment from 'moment';
import Input from '@components/ui/Input';
import Icon from '@components/ui/Icon';
import useGlobalStore from '@stores/useGlobalStore';

type AllBudgetRequest = {
  onGetId: (id: string) => void;
};

export const EmptyState = (
  <div className="flex py-5">
    <div className="m-auto space-y-1">
      <div className="flex flex-col gap-1 text-center">
        <span className="text-[#667085] font-semibold">No product data</span>
        <p className="text-xs text-[#667085]">Product data will shown here</p>
      </div>
    </div>
  </div>
);

const ProductTable: React.FC<AllBudgetRequest> = ({ onGetId }) => {
  const { setShowModalUpdate, setShowModalConfirm, setShowModalAdd } =
    useGlobalStore();

  const [filter, setFilter] = useState('');

  const { data: dataListProduct } = useQuery({
    queryKey: [LIST_PRODUCT_KEY],
    queryFn: () => productList(),
  });

  const filteredProducts = useMemo(() => {
    if (!dataListProduct) {
      return [];
    }
    return dataListProduct.filter((product) =>
      product.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [dataListProduct, filter]);

  const handleShowModalUpdate = (id: string) => {
    onGetId(id);
    setShowModalUpdate(true);
  };
  const handleShowModalConfirm = (id: string) => {
    onGetId(id);
    setShowModalConfirm(true);
  };
  return (
    <>
      <div className="w-full space-y-2">
        <div className="px-3 md:px-1 flex items-center gap-2">
          <Input
            inputSize="normal"
            fullWidth
            placeholder="Search product"
            color="secondary"
            inputSuffix={<Icon icon="TbSearch" fontSize={18} />}
            onChange={({ target }) => setFilter(target.value)}
          />
          <Button
            label="Add Product"
            variant="contained"
            color="secondary"
            startIcon={{ icon: 'TbPlus', isEnabled: true }}
            onClick={() => setShowModalAdd(true)}
            noMargin
          />
        </div>
        <Table
          customEmptyState={EmptyState}
          columns={[
            {
              header: 'Item',
              cell: ({ row }) => <>{row?.original?.title}</>,
            },
            {
              header: 'Price',
              cell: ({ row }) => <>{row?.original?.price}</>,
            },
            {
              header: 'Date',
              cell: ({ row }) => (
                <>{moment(row?.original?.creationAt).format('YYYY MMM DD')}</>
              ),
            },
            {
              header: 'Description',
              cell: ({ row }) => <>{row?.original?.description}</>,
            },
            {
              header: 'Action',
              cell: ({ row }) => (
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    color="secondary"
                    startIcon={{ icon: 'TbEdit', isEnabled: true }}
                    size="small"
                    onClick={() => handleShowModalUpdate(row?.original?.id)}
                  />
                  <Button
                    variant="ghost"
                    color="secondary"
                    startIcon={{ icon: 'TbTrash', isEnabled: true }}
                    size="small"
                    onClick={() => handleShowModalConfirm(row?.original?.id)}
                  />
                </div>
              ),
            },
          ]}
          datas={filteredProducts}
          hidePagination={false}
        />
      </div>
    </>
  );
};

export default ProductTable;
