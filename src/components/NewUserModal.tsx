import { XMarkIcon } from '@heroicons/react/24/outline'
import * as Dialog from '@radix-ui/react-dialog'

interface NewUserModalProps {}

export function NewUserModal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 w-screen h-screen bg-black bg-opacity-80" />

      <Dialog.Content className="md:min-w-[42rem] md:min-h-[32rem] fixed top-1/2 left-1/2 -translate-x-1/2 w-screen md:w-auto -translate-y-1/2 md:px-10 md:py-4 bg-white md:rounded-md  h-screen md:h-auto p-10 overflow-auto md:overflow-auto">
        <Dialog.Close className="absolute top-[1.5rem] right-[1.5rem]">
          <XMarkIcon className="w-5 h-5" />
        </Dialog.Close>

        <form action="#" method="POST" className="flex flex-col gap-4 mt-8">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome Completo:
              </label>
              <input
                type="text"
                name="full-name"
                id="full-name"
                autoFocus
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Simon"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="cpf"
                className="block text-sm font-medium text-gray-700"
              >
                CPF:
              </label>
              <input
                type="text"
                name="cpf"
                id="cpf"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="000.000.000-00"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                Telefone:
              </label>
              <input
                type="text"
                name="phone-number"
                id="phone-number"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="simon@gmail.com"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="zipcode"
                className="block text-sm font-medium text-gray-700"
              >
                CEP:
              </label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="00000-000"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Estado:
              </label>
              <select
                id="state"
                name="state"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500"
              >
                <option>CE</option>
                <option>PI</option>
                <option>MS</option>
              </select>
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Cidade:
              </label>
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="city"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Rua Coronel Henrique Rodrigues"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Rua:
              </label>
              <input
                type="text"
                name="street"
                id="street"
                autoComplete="street"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Rua Coronel Henrique Rodrigues"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="neighborhood"
                className="block text-sm font-medium text-gray-700"
              >
                Bairro:
              </label>
              <input
                type="text"
                name="neighborhood"
                id="neighborhood"
                autoComplete="neighborhood"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Centro"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700"
              >
                Número:
              </label>
              <input
                type="number"
                name="number"
                id="number"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="000"
              />
            </div>

            <div className="col-span-6 sm:col-span-3 ">
              <label
                htmlFor="complement"
                className="block text-sm font-medium text-gray-700"
              >
                Complemento:
              </label>
              <input
                type="text"
                name="complement"
                id="complement"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Ex.: apt. 42"
              />
            </div>
          </div>
          <div className="flex items-center self-center mt-5">
            <button
              type="submit"
              className="flex justify-center px-8 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:border-orange-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
