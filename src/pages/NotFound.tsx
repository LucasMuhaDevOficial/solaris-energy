import { NavLink } from 'react-router-dom'

import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-16">
      <div className=" flex items-center justify-center">
        <h1 className="text-2xl border-r-2 border-orange-500 mr-2 pr-4 font-medium">
          404
        </h1>
        <span className="pl-2 text-black ">This page could not be found.</span>
      </div>
      <div>
        <NavLink
          to="/signin"
          className="text-sm px-6 py-4 bg-orange-500 text-white rounded-md flex items-center justify-center gap-4"
        >
          <ArrowLeftIcon className="w-5 h-5 text-white" />
          Retornar a home
        </NavLink>
      </div>
    </div>
  )
}
