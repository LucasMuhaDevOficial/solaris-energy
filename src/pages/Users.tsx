import { PlusIcon } from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'

import { NewUserModal } from '../components/NewUserModal'
import { UsersTable } from '../components/UsersTable'

export function Users() {
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
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <Dialog.Root>
              <NewUserModal />
              <Dialog.Trigger className="relative w-48 h-12 overflow-hidden text-lg bg-white rounded-lg shadow group">
                <div className="absolute inset-0 w-3 bg-orange-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative flex items-center justify-center gap-2 text-sm font-medium text-black group-hover:text-white">
                  <PlusIcon className="w-5 h-5" />
                  <span>Cadastrar usuário</span>
                </span>
              </Dialog.Trigger>
            </Dialog.Root>
          </div>
          <UsersTable />
        </div>
      </main>
    </div>
  )
}
