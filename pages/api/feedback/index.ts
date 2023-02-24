// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetData, ProductRequest, User } from '@/types'
import { Feedback, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../../public/data.json'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Feedback[] | Feedback>
) {
  if (req.method === 'GET') {
    const feedback = await prisma.feedback.findMany()
    res.json(feedback)
  } else if (req.method === 'POST') {
    const { title, detail, category } = JSON.parse(req.body)
    console.log(title)
    const feedback = await prisma.feedback.create({
      data: {
        title: title,
        description: detail,
        category: {
          connect: {
            name: category
          },
        },
        user: {
          connect: {
            username: "velvetround"
          },
        },
        status: {
          connect: {
            name: 'Suggestion'
          }
        }
      }
    })
    res.status(201).json(feedback)
  }
}
