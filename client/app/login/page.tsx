// app/login/page.tsx
import React from 'react';
import InputField from '../../components/InputField';

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <h1 className='text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100'>
        Login
      </h1>
      <form className='bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm'>
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
