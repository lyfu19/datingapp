import { useForm } from 'react-hook-form';
import { LoginFormValues, loginSchema } from '../../schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { login } from '../../services/accountService';
import { useAuth } from '../../context/AuthContext';
import { LoginRequest } from '../../shared/types';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { login: setAuthUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);

      const payload: LoginRequest = {
        email: data.email,
        password: data.password,
      };
      const user = await login(payload);
      setAuthUser(user);
      reset();
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      alert(error.response?.data || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit(handleLoginSubmit)}>
      <div className="relative">
        <input {...register('email')} type="text" className="input" placeholder="Email" />
        {errors.email && (
          <p className="absolute left-0 top-full mt-1 text-xs text-red-600 bg-white border border-red-400 p-1 rounded shadow">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="relative">
        <input {...register('password')} type="password" className="input" placeholder="Password" />
        {errors.password && (
          <p className="absolute left-0 top-full mt-1 text-xs text-red-600 bg-white border border-red-400 p-1 rounded shadow">
            {errors.password.message}
          </p>
        )}
      </div>
      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
