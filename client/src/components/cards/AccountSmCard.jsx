import React from 'react'
import { Button } from '../ui/button'

const AccountSmCard = () => {
  return (
    <div className="mt-auto w-full flex items-center justify-between gap-3 rounded-xl p-2 px-3 font-semibold text-lg tracking-wide dark:text-white transition-all bg-slate-50 text-[#09090b] ease-in dark:bg-[#27272a]/50">
    <div className="w-fit flex items-center gap-2">
      <img
        src="https://pbs.twimg.com/profile_images/1564549161974112256/OU_vwEqS_400x400.jpg"
        alt=""
        className="w-10 h-10 rounded-full object-contain"
      />
      <div className="w-fit h-full flex flex-col items-start">
        <h1 className="text-sm">Abhishek Katkam</h1>
        <p className="text-xs text-slate-500">@abhishekkatkam09</p>
      </div>
    </div>
   <Button className="h-7 bg-[#09090b] dark:bg-white">Unblock</Button>
  </div>
  )
}

export default AccountSmCard