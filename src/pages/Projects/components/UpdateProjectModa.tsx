import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline'
import * as Dialog from '@radix-ui/react-dialog'

import { useProjects } from '../../../hooks/useProjects'
import { apiZipCode } from '../../../libs/axios'
import { capitalizeString } from '../../../utils/capitalizeString'
import { dateFormatter } from '../../../utils/dateFormatter'
import {
  maskPhoneNumber,
  maskZipCode,
  removeMask,
} from '../../../utils/maskInputs'

interface NewProjectModalFields {
  client_name: string
  phone: string
  zipcode: string
  state: string
  city: string
  street: string
  neighborhood: string
  number: number
  complement: string
  concessionaire: string
  power: number
}

interface Address {
  uf: string
  localidade: string
  logradouro: string
  complemento: string
  bairro: string
}

export function UpdateProjectModal() {
  const { states, formData, updateProject } = useProjects()

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<NewProjectModalFields>({})

  const phoneValue = watch('phone')
  const zipCodeValue = watch('zipcode')

  function onUpdate(data: NewProjectModalFields) {
    if (formData) {
      updateProject(
        {
          id: crypto.randomUUID(),
          created_at: dateFormatter(new Date()),
          ...data,
        },
        formData.id
      )
    }

    toast.success('Usuário atualizado com sucesso')
  }

  useEffect(() => {
    reset(formData)
  }, [formData, reset])

  useEffect(() => {
    async function handleCepNumber(zipCode: string) {
      setValue('zipcode', maskZipCode(zipCode))

      if (removeMask(zipCode).length === 8) {
        const response = await apiZipCode.get(`/${zipCode}/json`)

        const { complemento, localidade, logradouro, uf, bairro } =
          response.data as Address

        setValue('city', localidade)
        setValue('neighborhood', bairro)
        setValue('state', uf)
        setValue('street', logradouro)
        setValue('complement', capitalizeString(complemento))
      }
    }

    handleCepNumber(zipCodeValue)
  }, [setValue, zipCodeValue])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 w-screen h-screen bg-black bg-opacity-80" />

      <Dialog.Content className="md:min-w-[42rem] md:min-h-[42rem] fixed top-1/2 left-1/2 -translate-x-1/2 w-screen md:w-auto -translate-y-1/2 md:py-4 bg-white md:rounded-md  h-screen md:max-h-[42rem] md:p-10 p-10 overflow-auto md:overflow-auto">
        <Dialog.Close className="absolute top-[1.5rem] right-[1.5rem]">
          <XMarkIcon className="w-5 h-5" />
        </Dialog.Close>

        <form
          onSubmit={handleSubmit(onUpdate)}
          className="flex flex-col gap-4 mt-8"
        >
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="client_name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome Completo:
              </label>
              <input
                type="text"
                id="client_name"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Simon Wenberg"
                {...register('client_name')}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Telefone:
              </label>
              <input
                type="text"
                id="phone"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="(00) 00000-0000"
                {...register('phone')}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="concessionaire"
                className="block text-sm font-medium text-gray-700"
              >
                Concessionaria:
              </label>
              <input
                type="text"
                id="concessionaire"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Ex.: Enel - CE"
                {...register('concessionaire')}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="power"
                className="block text-sm font-medium text-gray-700"
              >
                Potência do Projeto (Wp):
              </label>
              <input
                type="number"
                id="power"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Ex.: 5000"
                {...register('power')}
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
                id="zipcode"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="00000-000"
                {...register('zipcode')}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                Estado:
              </label>
              <select
                id="state"
                className="w-full p-1 mt-1 border-b-2 outline-none cursor-pointer border-orange-500/50 focus:border-orange-500"
                {...register('state')}
              >
                {states.map((state) => (
                  <option key={state.id}>{state.sigla}</option>
                ))}
              </select>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Cidade:
              </label>
              <input
                type="text"
                id="city"
                autoComplete="city"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Sobral"
                {...register('city')}
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
                id="street"
                autoComplete="street"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Rua Coronel Henrique Rodrigues"
                {...register('street')}
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
                id="neighborhood"
                autoComplete="neighborhood"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Centro"
                {...register('neighborhood')}
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
                id="number"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="000"
                {...register('number')}
              />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="complement"
                className="block text-sm font-medium text-gray-700"
              >
                Complemento:
              </label>
              <input
                type="text"
                id="complement"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Ex.: apt. 42"
                {...register('complement')}
              />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Envie um arquivo:
              </label>
              <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-orange-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <CloudArrowUpIcon className="w-12 h-12 mx-auto text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative font-medium text-orange-500 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500"
                    >
                      <span>Carregue um arquivo</span>

                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF até 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center self-center mt-5">
            <button
              type="submit"
              className="flex justify-center px-8 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:border-orange-500"
            >
              Atualizar
            </button>
          </div>
        </form>
      </Dialog.Content>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Dialog.Portal>
  )
}
