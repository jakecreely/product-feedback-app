// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Feedback, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Feedback>
) {
  console.log("working")
  if (req.method === 'POST') {
    const { id } = req.query
    if (id !== undefined && typeof id === 'string') {
      const parsedBody = JSON.parse(req.body)
      let content: string = parsedBody.content
      const updatedFeedback = await prisma.feedback.update({
        where: {
          id: id,
        },
        data: {
          comments: {
            create: {
              content: content,
              user: {
                connect: {
                  username: "velvetround"
                }
              }
            },
          }
        }
      })
      res.status(201).json(updatedFeedback)
    }
  }
}
