import { BACKEND_BASE_URL } from '../config'
import type { IAttrsGet } from '../model'

const get = async ({
  params = '',
  nextSuccess = () => {},
  nextError = () => {},
  nextFinally = () => {}
}: IAttrsGet) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}${params || ''}`).then((res) => res.json())

    if (response) {
      if (nextSuccess) nextSuccess(response)
    }
  } catch (err) {
    if (nextError) nextError(err)
  } finally {
    if (nextFinally) nextFinally()
  }
}

export { get }
