import { LIST_CATEGORY_KEY } from '@constants/queryKey';
import { categoryList } from '@services/fetcher/category';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

const useCategoryList = () => {
  const { data: dataListCategory, refetch: refetchCategoryList } = useQuery({
    queryKey: [LIST_CATEGORY_KEY],
    queryFn: () => categoryList(),
  });

  const categories = useMemo(() => {
    if (dataListCategory) {
      return dataListCategory;
    }
    return [];
  }, [dataListCategory]);

  return {
    categories,
    refetchCategoryList,
  };
};

export default useCategoryList;
