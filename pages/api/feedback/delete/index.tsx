// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetData, ProductRequest, User } from '@/types'
import { Feedback, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../../../public/data.json'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Feedback>
) {
    if (req.method === 'POST') {
        const {id } = JSON.parse(req.body)
        const feedback = await prisma.feedback.delete({
            where: {
                id: id
            }
        })
        console.log(feedback)
        res.status(204).json(feedback)
    }
}
