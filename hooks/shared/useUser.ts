import { user } from '@services/fetcher/user';
import { useQuery } from 'react-query';

const useUser = () => {
  const {
    data: dataUser,
    isError,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['USER_KEY'],
    queryFn: () => user(),
    cacheTime: 5 * 60 * 1000,
  });

  return {
    dataUser,
    refetchUser,
    isError,
    isLoading,
  };
};

export default useUser;
