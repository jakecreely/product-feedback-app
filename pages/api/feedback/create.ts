// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetData, ProductRequest, User } from '@/types'
import { Category, Feedback, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../../public/data.json'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const alice = await prisma.user.create({
    data: {
      username: 'alice@prisma.io',
      name: 'Alice',
      image: 'Image Url',
      replies: {},
      feedback: {},
      comments: {}
    }
    })
  res.json(alice)
}
