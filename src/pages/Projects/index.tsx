import { DocumentPlusIcon } from '@heroicons/react/24/outline'
import * as Dialog from '@radix-ui/react-dialog'

import { ProjectsProvider } from '../../contexts/ProjectsContext'
import { NewProjectModal } from './components/NewProjectModal'
import { ProjectsFilter } from './components/ProjectsFilter'
import { ProjectsTable } from './components/ProjectsTable'

export function Projects() {
  return (
    <ProjectsProvider>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Projetos
            </h1>
          </div>
        </header>
        <main>
          <div className="flex flex-col px-8 py-8 m-auto max-w-7xl scroll-auto">
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
              <ProjectsFilter />
              <Dialog.Root>
                <Dialog.Trigger className="relative self-end w-full h-12 overflow-hidden text-lg bg-white rounded-md shadow md:w-48 disabled:cursor-not-allowed group disabled:opacity-50">
                  <div className="absolute inset-0 w-3 bg-orange-500 transition-all duration-[250ms] ease-out group-hover:w-full group-disabled:w-3 "></div>
                  <span className="relative flex items-center justify-center gap-2 text-sm font-medium text-black group-hover:text-white group-disabled:text-black">
                    <DocumentPlusIcon className="w-5 h-5" />
                    <span>Cadastrar Projeto</span>
                  </span>
                </Dialog.Trigger>
                <NewProjectModal />
              </Dialog.Root>
            </div>
            <ProjectsTable />
          </div>
        </main>
      </div>
    </ProjectsProvider>
  )
}
