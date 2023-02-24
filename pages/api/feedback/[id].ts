// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Feedback, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'bson'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Feedback | {error: String, message: String}>
) {
  const {id} = req.query
  if (id === undefined) {
    res.status(400).json({error: 'Bad Request', message: 'Missing ID'})
  } else if (typeof id !== 'string') {
    res.status(400).json({error: 'Bad Request', message: 'ID must be a string'})
  } else if (id.length !== 24) {
    res.status(400).json({error: 'Bad Request', message: 'ID must be the correct length'})
  } else {
      const feedback = await prisma.feedback.findUnique({
        where: {
          id: id
        }
     })
      if (feedback === null) {
        res.status(404).json({error: 'Not Found', message: 'Feedback not found with ID'})
      } else {
        res.status(200).json(feedback)
      }
  }
}

