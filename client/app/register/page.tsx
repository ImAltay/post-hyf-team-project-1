import React from 'react';

type Props = {};

const register = (props: Props) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <h1 className='text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100'>
        Register
      </h1>
      <form className='bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm'>
        <div className='mb-4'>
          <label className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>
            Name:
          </label>
          <input
            type='text'
            name='name'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>
            Email:
          </label>
          <input
            type='text'
            name='email'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>
            Password:
          </label>
          <input
            type='password'
            name='password'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
          Register
        </button>
      </form>
    </div>
  );
};

export default register;
