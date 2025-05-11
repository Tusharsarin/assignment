'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useEffect, useState } from 'react'; // Add this import

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(1, 'Age must be positive'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  interest: z.array(z.string().min(1)).min(1, 'At least one interest is required'),
});

export default function AddUserPage() {
  const [isClient, setIsClient] = useState(false); // Add this state
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue 
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setIsClient(true); // Set to true when component mounts on client
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/user', data);
      router.push('/');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  if (!isClient) {
    return null; // Return nothing during SSR
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => router.back()}
          className="mr-2 p-2 rounded-full hover:border cursor-pointer transition-colors"
          aria-label="Go back"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
        </button>
        {/* <h1 className="text-2xl font-bold">User Details</h1> */}
      <h1 className="text-2xl font-bold">Add New User</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input {...register('name')} className="border p-2 w-full" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        
        <div>
          <label className="block">Email</label>
          <input {...register('email')} className="border p-2 w-full" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        
        <div>
          <label className="block">Age</label>
          <input 
            type="number" 
            {...register('age', { valueAsNumber: true })} 
            className="border p-2 w-full" 
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>
        
        <div>
          <label className="block">Mobile</label>
          <input {...register('mobile')} className="border p-2 w-full" />
          {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
        </div>
        
        <div>
          <label className="block">Interests (comma separated)</label>
          <input 
            {...register('interest')} 
            onChange={(e) => setValue('interest', e.target.value.split(',').map(i => i.trim()))}
            className="border p-2 w-full" 
          />
          {errors.interest && <p className="text-red-500">{errors.interest.message}</p>}
        </div>
        
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
          Save User
        </button>
      </form>
    </div>
  );
}