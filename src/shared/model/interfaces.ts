interface INotificationMsg {
  text: string
  status: 'success' | 'warning' | 'error'
  id?: string
}

interface ISpaceship {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: number
  length: number
  max_atmosphering_speed: number
  crew: string
  passengers: number
  cargo_capacity: number
  consumables: string
  hyperdrive_rating: string
  MGLT: number
  starship_class: string
  pilots: string[]
  films: string[]
  created: Date
  edited: Date
  url: string
}

interface IAttrsGet {
  params?: string
  nextSuccess?: (res: any) => void
  nextError?: (err: any) => void
  nextFinally?: () => void
}

export type { INotificationMsg, ISpaceship, IAttrsGet }
