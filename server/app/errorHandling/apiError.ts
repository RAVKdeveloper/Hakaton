import type { Response } from 'express'

interface Props {
  readonly res: Response
  readonly str?: string | any[]
}

export class ApiError {
  public SERVER_INTERNAL({ res, str }: Props) {
    res.status(500).send({ status: 500, message: str ?? 'Server internal' })
  }

  public NOT_FOUND({ res, str }: Props) {
    res.status(404).send({ status: 404, message: str ?? 'Not Found' })
  }

  public BAD_REQUEST({ res, str }: Props) {
    res.status(400).send({ status: 400, message: str ?? 'Invalid data' })
  }

  public FORBBIDEN({ res, str }: Props) {
    res.status(403).send({ status: 403, message: str ?? 'Forbbiden' })
  }
}
