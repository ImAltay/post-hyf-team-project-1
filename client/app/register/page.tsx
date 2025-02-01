'use client';
import { useState } from 'react';
import InputField from '../../components/InputField';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle successful registration
        console.log('Registration successful');
      } else {
        // Handle errors
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
