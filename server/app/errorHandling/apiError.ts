import type { Response } from 'express'

interface Props {
  readonly res: Response
  readonly str?: string
}

export class ApiError extends Error {
  public SERVER_INTERNAL({ res, str }: Props) {
    res.status(500).send({ status: 500, message: str ?? 'Server internal' })
  }

  public NOT_FOUND({ res, str }: Props) {
    res.status(404).send({ status: 404, message: str ?? 'Not Found' })
  }
}
