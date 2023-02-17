// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetData, ProductRequest, User } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../../public/data.json'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  
  res.status(200).json(data.productRequests)
}
