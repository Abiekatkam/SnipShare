import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <main className='w-full h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
            <h1 className='text-3xl font-bold text-[#09090b] dark:text-white'>404 | Page not found</h1>
            <p className='text-[#09090b] dark:text-white'>Ooops!!! The page you are looking for is not found</p>
            <Link to="/">
            <Button className="h-8">Back to home</Button>
            </Link>
        </div>
    </main>
  )
}

export default ErrorPage