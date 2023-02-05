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
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </a>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
