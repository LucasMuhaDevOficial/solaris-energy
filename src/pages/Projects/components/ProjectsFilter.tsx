import { Fragment, useEffect, useState } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

import { useProjects } from '../../../hooks/useProjects'

interface IStates {
  id: string
  sigla: string
  nome: string
}

export function ProjectsFilter() {
  const { states, orderProjectByState, getProjects } = useProjects()
  const [selected, setSelected] = useState<IStates>()

  function handleOrderProjectByState(stateName: string) {
    orderProjectByState(stateName)
  }

  useEffect(() => {
    setSelected(states[0])
  }, [states])

  return (
    <div className="w-full md:w-60">
      <Listbox
        value={selected}
        onChange={(state) => {
          setSelected(state), handleOrderProjectByState(state.sigla)
        }}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              Cadastrados em:
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm">
                <span className="flex items-center">
                  <span className="block ml-3 truncate">{selected?.nome}</span>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {states.map((state) => (
                    <Listbox.Option
                      key={state.id}
                      className={({ active }) =>
                        clsx(
                          active ? 'text-white bg-orange-500' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={state}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={clsx(
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate'
                              )}
                            >
                              {state.nome}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={clsx(
                                active ? 'text-white' : 'text-orange-500',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}
