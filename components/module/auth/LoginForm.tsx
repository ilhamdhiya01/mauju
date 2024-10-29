import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import { toast } from '@components/ui/ToastProvider';
import { DEFAULT_VALUE_REGISTER_FORM } from '@constants/initialValue';
import AuthLoginForm from '@constants/schema/validation/LoginForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '@services/fetcher/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { PATH_PAGE_DASHBOARD } from '@constants/router';

type LoginFormType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { name: __, ...DEFAULT_VALUE_LOGIN_FORM } = DEFAULT_VALUE_REGISTER_FORM;

  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: 'onBlur',
    resolver: yupResolver(AuthLoginForm as any),
    defaultValues: DEFAULT_VALUE_LOGIN_FORM,
  });

  const email = watch('email');
  const password = watch('password');

  const { mutate: mutationRegister } = useMutation({
    onMutate: () => setIsLoading(true),
    mutationFn: login,
    onError: () => {
      toast.error('Failed to login');
      setIsLoading(false);
    },
    onSuccess: () => {
      toast.success('Success login');
      router.replace(PATH_PAGE_DASHBOARD);
      setIsLoading(false);
      reset();
    },
  });

  const onSubmit = () => {
    mutationRegister({
      email,
      password,
    });
  };
  return (
    <>
      <div className="w-[70%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-8">
        <div>
          <h1 className="text-[#333333] font-bold text-lg">Hello Again!</h1>
          <p className="text-[#333333] text-sm">Welcome Back</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Email Address"
            inputPrefix={<Icon icon="TbMail" fontSize={18} />}
            color="secondary"
            inputSize="normal"
            fullWidth
            isRoundedFull
            errorMessage={errors.email?.message}
            value={email}
            onChange={({ target }) => setValue('email', target.value)}
          />
          <Input
            placeholder="Password"
            inputPrefix={<Icon icon="TbLock" fontSize={18} />}
            color="secondary"
            inputSize="normal"
            fullWidth
            isRoundedFull
            type="password"
            errorMessage={errors.password?.message}
            value={password}
            onChange={({ target }) => setValue('password', target.value)}
          />
          <Button
            isRoundedFull
            fullWidth
            label="Login"
            color="secondary"
            variant="contained"
            noMargin
            type="submit"
            isLoading={isLoading}
          />
          <Button
            isRoundedFull
            fullWidth
            label="Register"
            color="neutral"
            variant="ghost"
            size="small"
            noMargin
          />
        </form>
      </div>
    </>
  );
};

export default LoginForm;
