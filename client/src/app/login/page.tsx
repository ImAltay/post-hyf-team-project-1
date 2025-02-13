'use client';
import InputField from '../../components/InputField';
import { toast } from 'react-toastify';

const Login = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Login form submitted');
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: target.email.value,
          password: target.password.value,
        }),
      });
      if (response.ok) {
        toast.success('Login successful');
      } else {
        toast.error('Login failed');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <h1 className='text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100'>
        Login
      </h1>
      <form
        className='bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm'
        onSubmit={handleSubmit}>
        <InputField label='Email' name='email' type='text' />
        <InputField label='Password' name='password' type='password' />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
