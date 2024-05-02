import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'react-toastify'

const RootPage = () => {
  function toastMessage() {
    toast.success("toastify is working! woohhooo!")
  }
  return (
    <main className=''>
      <Button onClick={toastMessage}>Toast</Button>
    </main>
  )
}

export default RootPage