import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { register } from '@services/fetcher/auth';
import { toast } from '@components/ui/ToastProvider';
import { useMutation } from 'react-query';
import { DEFAULT_VALUE_REGISTER_FORM } from '@constants/initialValue';
import AuthRegisterForm from '@constants/schema/validation/RegisterForm';
import { useRouter } from 'next/navigation';
import { PATH_PAGE_DASHBOARD } from '@constants/router';

type RegisterFormType = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterFormType>({
    mode: 'onBlur',
    resolver: yupResolver(AuthRegisterForm as any),
    defaultValues: DEFAULT_VALUE_REGISTER_FORM,
  });

  const name = watch('name');
  const email = watch('email');
  const password = watch('password');

  const { mutate: mutationRegister } = useMutation({
    onMutate: () => setIsLoading(true),
    mutationFn: register,
    onError: () => {
      toast.error('Failed to register');
      setIsLoading(false);
    },
    onSuccess: () => {
      toast.success('Success register');
      router.replace(PATH_PAGE_DASHBOARD);
      setIsLoading(false);
      reset();
    },
  });

  const onSubmit = () => {
    mutationRegister({
      email,
      name,
      password,
    });
  };
  return (
    <>
      <div className="w-[70%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-8">
        <div>
          <h1 className="text-[#333333] font-bold text-lg">Hello!</h1>
          <p className="text-[#333333] text-sm">Sign Up to Get Started</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Full Name"
            inputPrefix={<Icon icon="TbUser" fontSize={18} />}
            color="secondary"
            inputSize="normal"
            fullWidth
            isRoundedFull
            errorMessage={errors.name?.message}
            value={name}
            onChange={({ target }) => setValue('name', target.value)}
          />
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
            type="submit"
            label="Register"
            color="secondary"
            variant="contained"
            noMargin
            isLoading={isLoading}
          />
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
