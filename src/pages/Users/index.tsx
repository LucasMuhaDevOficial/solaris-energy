import { PlusIcon } from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'

import { useUsers } from '../../hooks/useUsers'
import { NewUserModal } from './components/NewUserModal'
import { UsersTable } from './components/UsersTable'

export function Users() {
  const { isFetched } = useUsers()

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Usuários
          </h1>
        </div>
      </header>
      <main>
        <div className="flex flex-col px-8 py-8 m-auto max-w-7xl scroll-auto">
          <Dialog.Root>
            <Dialog.Trigger
              className="relative self-end w-48 h-12 overflow-hidden text-lg bg-white rounded-lg shadow disabled:cursor-not-allowed group disabled:opacity-50"
              disabled={isFetched}
            >
              <div className="absolute inset-0 w-3 bg-orange-500 transition-all duration-[250ms] ease-out group-hover:w-full group-disabled:w-3 "></div>
              <span className="relative flex items-center justify-center gap-2 text-sm font-medium text-black group-hover:text-white group-disabled:text-black">
                <PlusIcon className="w-5 h-5" />
                <span>Cadastrar usuário</span>
              </span>
            </Dialog.Trigger>
            <NewUserModal />
          </Dialog.Root>
          <UsersTable />
        </div>
      </main>
    </div>
  )
}
