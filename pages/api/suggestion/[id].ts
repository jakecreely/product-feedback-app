// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetData, ProductRequest, User } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../../public/data.json'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const {id} = req.query
  if (!id) {
    res.status(400).json({error: 'Bad Request'})
    return
  } else {
  const productRequestById = data.productRequests.filter((elem) => elem.id === parseInt(id as string))
  res.status(200).json(productRequestById)
  }
}
