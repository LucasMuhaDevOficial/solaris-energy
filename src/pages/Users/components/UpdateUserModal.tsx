import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline'
import * as Dialog from '@radix-ui/react-dialog'

import { useUsers } from '../../../hooks/useUsers'
import { apiZipCode } from '../../../libs/axios'
import { capitalizeString } from '../../../utils/capitalizeString'
import { dateFormatter } from '../../../utils/dateFormatter'
import {
  maskCpfNumber,
  maskPhoneNumber,
  maskZipCode,
  removeMask,
} from '../../../utils/maskInputs'

interface UpdateUserModalFields {
  name: string
  cpf: string
  phone: string
  email: string
  zipcode: string
  state: string
  city: string
  street: string
  neighborhood: string
  number: number
  complement: string
}

interface Address {
  uf: string
  localidade: string
  logradouro: string
  complemento: string
  bairro: string
}

export function UpdateUserModal() {
  const { states, formData, setFormData, updateUser } = useUsers()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isLoading },
  } = useForm<UpdateUserModalFields>({})

  const phoneValue = watch('phone', '')
  const zipCodeValue = watch('zipcode', '')
  const cpfValue = watch('cpf', '')

  function onUpdate(data: UpdateUserModalFields) {
    console.log(data)

    if (formData) {
      updateUser(
        {
          id: crypto.randomUUID(),
          created_at: dateFormatter(new Date()),
          ...data,
        },
        formData?.id
      )
    }

    toast.success('Usuário atualizado com sucesso')
  }

  useEffect(() => {
    reset(formData)
  }, [formData, reset])

  useEffect(() => {
    setValue('zipcode', maskZipCode(zipCodeValue))
  }, [setValue, zipCodeValue])

  useEffect(() => {
    setValue('cpf', maskCpfNumber(cpfValue))
  }, [setValue, phoneValue, cpfValue])

  useEffect(() => {
    setValue('phone', maskPhoneNumber(phoneValue))
  }, [phoneValue, setValue])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 w-screen h-screen bg-black bg-opacity-80" />

      <Dialog.Content className="md:min-w-[42rem] md:min-h-[32rem] fixed top-1/2 left-1/2 -translate-x-1/2 w-screen md:w-auto -translate-y-1/2 md:px-10 md:py-4 bg-white md:rounded-md  h-screen md:h-auto p-10 overflow-auto md:overflow-auto">
        <Dialog.Close className="absolute top-[1.5rem] right-[1.5rem]">
          <XMarkIcon className="w-5 h-5" />
        </Dialog.Close>

        <form
          onSubmit={handleSubmit(onUpdate)}
          className="flex flex-col gap-4 mt-8"
        >
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome Completo:
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="Simon Wenberg"
                {...register('name')}
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
                id="cpf"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="000.000.000-00"
                {...register('cpf')}
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

            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-1 mt-1 border-b-2 outline-none border-orange-500/50 focus:border-orange-500 placeholder:text-sm"
                placeholder="simon@gmail.com"
                {...register('email')}
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

            <div className="col-span-6 sm:col-span-6">
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

            <div className="col-span-6 sm:col-span-3 ">
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
          </div>
          <div className="flex items-center self-center mt-5">
            <button
              type="submit"
              className="flex justify-center px-8 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:border-orange-500"
            >
              {!isLoading ? (
                <ArrowPathIcon
                  color="#fff"
                  className="h-6 animate-spin w-h-6"
                />
              ) : (
                'Atualizar'
              )}
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
