import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterFormValues, registerSchema } from '../../schemas/registerSchema';
import { RegisterRequest } from '../../shared/types';
import { useState } from 'react';
import { register as registerUser } from '../../services/accountService';
import { useAuth } from '../../context/AuthContext';

type RegisterProps = {
  onCancel: () => void;
};

const RegisterForm = ({ onCancel }: RegisterProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      setLoading(true);

      const payload: RegisterRequest = {
        email: data.email,
        displayName: data.displayName,
        password: data.password,
      };
      const user = await registerUser(payload);
      login(user);
      reset();
      onCancel();
    } catch (error: any) {
      console.error('❌ Register failed:', error);
      alert(error.response?.data || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-1/2 mx-auto flex flex-col p-6 rounded-lg shadow-lg">
      <div className="card-title justify-center text-3xl text-primary">Sign up</div>
      <div className="card-body w-full">
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(handleRegisterSubmit)}>
          <div className="flex flex-col gap-1">
            <input {...register('email')} className="input w-full" placeholder="Email" />
            {errors.email && (
              <p className="text-red-500 text-sm text-left">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register('displayName')}
              className="input w-full"
              placeholder="Display name"
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm text-left">{errors.displayName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register('password')}
              type="password"
              className="input w-full"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm text-left">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3">
            <button className="btn" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
