import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
    navigate('/account')
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-slate-300'>
      <div className='bg-white'>
        <form onSubmit={handleSubmit(onSubmit)} className='border-b p-4'>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" name="email" id='email' {...register("email")} className='border-2' />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <br />
            <input type="password" name="password" {...register("pass")} id='password' className='border-2' />
          </div>
          <input type="submit" value="Login" className='border px-4 py-2 mt-5' />
        </form>

        <div className='w-fit mx-auto p-4'>
          <Link to='/register' className='hover:text-blue-400'>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
