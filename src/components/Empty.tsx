import {
  InformationCircleIcon,
  ArrowSmallLeftIcon,
} from '@heroicons/react/24/outline'

import { useProjects } from '../hooks/useProjects'

interface EmptyProps {
  title: string
  btnIsVisible?: boolean
  onClickFn?: () => void
}
export function Empty({ title, btnIsVisible = true, onClickFn }: EmptyProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-28">
      <InformationCircleIcon className="w-16 h-16 text-orange-500" />
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          <strong>{title}</strong>
          <span>Cadastre um agora.</span>
        </div>
        {btnIsVisible && (
          <button
            type="submit"
            className="flex items-center justify-center gap-4 px-8 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:border-orange-500"
            onClick={onClickFn}
          >
            <ArrowSmallLeftIcon className="w-5 h-5" />
            Projetos
          </button>
        )}
      </div>
    </div>
  )
}
