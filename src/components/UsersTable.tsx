import { BigHead } from '@bigheads/core'
import {
  TrashIcon,
  PencilIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

import { useUsers } from '../hooks/useUsers'
import { Loading } from './Loading'

export function UsersTable() {
  const { users, isFetched, deleteUsersFromDB } = useUsers()

  return (
    <>
      {isFetched ? (
        <Loading />
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-28">
          <ExclamationCircleIcon className="w-16 h-16 text-orange-500" />
          <div className="flex flex-col items-center">
            <strong className="text-orange-500">
              Sem usuários no momento!
            </strong>
            <span>Cadastre um agora clicando no botão acima.</span>
          </div>
        </div>
      ) : (
        <div className="mt-5 overflow-hidden overflow-x-auto border border-gray-200 rounded-lg shadow-md">
          <table className="w-full text-sm text-left text-gray-500 bg-white">
            <thead className="bg-orange-500">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-white">
                  Nome
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-white">
                  CPF
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-white">
                  CEP
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-white">
                  Telefone
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="border-t border-gray-100 divide-y divide-gray-100">
              {users.map((user) => {
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative w-10 h-10">
                        <BigHead />
                      </div>

                      <div className="text-sm" key={user.cpf}>
                        <div className="font-medium text-gray-700">
                          {user.name}
                        </div>
                        <div className="text-gray-400">{user.email}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4 w-[213px]">{user.cpf}</td>
                    <td className="px-6 py-4">{user.zipcode}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => deleteUsersFromDB(user.id)}
                          title="Deletar"
                        >
                          <TrashIcon className="w-6 h-6" />
                        </button>
                        <button title="Atualizar">
                          <PencilIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
