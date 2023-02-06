import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

export function UsersTable() {
  return (
    <>
      <div className="w-full m-5 overflow-hidden border border-gray-200 rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-500 bg-white border-collapse">
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
            <tr className="hover:bg-gray-50">
              <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div className="relative w-10 h-10">
                  <img
                    className="object-cover object-center w-full h-full rounded-full"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full ring ring-white"></span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-700">Steven Jobs</div>
                  <div className="text-gray-400">jobs@sailboatui.com</div>
                </div>
              </th>
              <td className="px-6 py-4 w-[213px]">005.212.173-93</td>
              <td className="px-6 py-4">62300-000</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">(88) 99901-4007</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-4">
                  <button>
                    <TrashIcon className="w-6 h-6" />
                  </button>
                  <button>
                    <PencilIcon className="w-6 h-6" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
