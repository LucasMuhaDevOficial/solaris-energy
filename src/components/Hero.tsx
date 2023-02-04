import { UserIcon } from '@heroicons/react/24/outline'

export function Hero() {
  return (
    <div className="relative w-full h-full px-6 pt-16 overflow-hidden bg-gray-900 bg-no-repeat bg-cover shadow-2xl isolate sm:px-16 md:pt-48 lg:flex lg:flex-col lg:gap-x-20 lg:px-24 lg:pt-0 bg-signin-pattern">
      <div className="mx-auto text-center lg:flex-auto lg:py-48 lg:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Boost your productivity.
          <br />
          Start using our app today.
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
          Malesuada adipiscing sagittis vel nulla.
        </p>
        <div className="flex items-center justify-center w-full mt-10 gap-x-6 lg:justify-center">
          <button className="flex items-center gap-4 px-12 py-4 text-base font-semibold leading-7 text-white bg-orange-500 rounded-md shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 ">
            Projetos
          </button>
          <button className="flex items-center gap-4 px-12 py-4 text-base font-semibold leading-7 text-orange-500 rounded-md shadow-sm ring-1 ring-orange-500 hover:bg-orange-500 hover:text-white">
            Usuários
          </button>
        </div>
      </div>
    </div>
  )
}
