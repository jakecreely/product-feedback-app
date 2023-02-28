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
        const {id, title, description, category, status} = JSON.parse(req.body)
        console.log(JSON.parse(req.body))
        const feedback = await prisma.feedback.update({
            where: {
                id: id
            },
            data: {
                title: title,
                description: description,
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
                        name: status
                    }
                }
            }
        })
        console.log(feedback)
        res.status(201).json(feedback)
    }
}
