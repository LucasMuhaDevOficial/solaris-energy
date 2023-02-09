import { PencilIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'
import * as Dialog from '@radix-ui/react-dialog'

import { Empty } from '../../../components/Empty'
import { Loading } from '../../../components/Loading'
import { useProjects } from '../../../hooks/useProjects'
import { UpdateProjectModal } from './UpdateProjectModa'

export function ProjectsTable() {
  const { projects, deleteProject, getFormDataForUpdate, isEmpty } =
    useProjects()

  function handleDeleteProject(projectId: string) {
    deleteProject(projectId)
  }

  return (
    <>
      {isEmpty ? (
        <Empty
          title="Sem projetos cadastrados nesse momento!"
          btnIsVisible={false}
        />
      ) : projects.length === 0 ? (
        <div className="py-28">
          <Loading />
        </div>
      ) : (
        <div className="mt-5 overflow-hidden overflow-x-auto border border-gray-200 rounded-lg shadow-md ">
          <table className="w-full text-sm text-left text-gray-500 bg-white">
            <thead className="bg-orange-500">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-white">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-white">
                  Potência (kWp)
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
            {projects.map((project) => {
              return (
                <tbody
                  key={project.id}
                  className="border-t border-gray-100 divide-y divide-gray-100"
                >
                  <tr className="hover:bg-gray-50">
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {project.client_name}
                        </div>
                        <div className="text-gray-400 uppercase">
                          {project.concessionaire}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4 w-[213px]">
                      {(project.power / 1000).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{project.zipcode}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">{project.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          title="Deletar"
                        >
                          <TrashIcon className="w-6 h-6" />
                        </button>
                        <Dialog.Root>
                          <Dialog.Trigger
                            title="Atualizar"
                            onClick={() => getFormDataForUpdate(project.id)}
                          >
                            <PencilIcon className="w-6 h-6" />
                          </Dialog.Trigger>
                          <UpdateProjectModal />
                        </Dialog.Root>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>
      )}
    </>
  )
}
