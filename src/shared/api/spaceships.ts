import { get } from './client'
import { useNotificationsStore } from '@/shared/model'

interface ISpaceshipsRequest {
  searchValue?: string
  page: number
  nextSuccess?: (res: any) => void
  nextError?: (err: any) => void
  nextFinally?: () => void
}

export const getSpaceships = (
  { searchValue, page, nextSuccess = () => {}, nextFinally = () => {} } = {} as ISpaceshipsRequest
) => {
  const { notification } = useNotificationsStore()

  const nextError = (err: any) => {
    notification({ status: 'error', text: 'Не удалось загрузить космические корабли' })
  }

  get({
    params: `/api/starships?search=${searchValue}&page=${page}`,
    nextSuccess,
    nextError,
    nextFinally
  })
}

export const getSpaceship = (url: string) => {}
