'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../components/InputField';
import { registerUser } from '../../slices/registerSlice';
import { RootState } from '../../store';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.register
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <h1 className='text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100'>
        Register
      </h1>
      <form
        className='bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm'
        onSubmit={handleSubmit}>
        <InputField
          label='Name'
          name='username'
          type='text'
          onChange={handleChange}
        />
        <InputField
          label='Email'
          name='email'
          type='text'
          onChange={handleChange}
        />
        <InputField
          label='Password'
          name='password'
          type='password'
          onChange={handleChange}
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>Registration successful!</p>}
      </form>
    </div>
  );
};

export default Register;
