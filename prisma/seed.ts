import { Prisma, PrismaClient } from '@prisma/client'
import data from '../public/data.json'

const prisma = new PrismaClient()

async function main() {

    let users = [
        {
            image: './assets/user-images/image-elijah.jpg',
            name: 'Elijah Moss',
            username: 'hexagon.bestagon'
          },
          {
            image: './assets/user-images/image-james.jpg',
            name: 'James Skinner',
            username: 'hummingbird1'
          },
          {
            image: './assets/user-images/image-suzanne.jpg',
            name: 'Suzanne Chang',
            username: 'upbeat1811'
          },
          {
            image: './assets/user-images/image-thomas.jpg',
            name: 'Thomas Hood',
            username: 'brawnybrave'
          },
          {
            image: './assets/user-images/image-victoria.jpg',
            name: 'Victoria Mejia',
            username: 'arlen_the_marlin'
          },
          {
            image: './assets/user-images/image-ryan.jpg',
            name: 'Ryan Welles',
            username: 'voyager.344'
          },
          {
            image: './assets/user-images/image-george.jpg',
            name: 'George Partridge',
            username: 'soccerviewer8'
          },
          {
            image: './assets/user-images/image-javier.jpg',
            name: 'Javier Pollard',
            username: 'warlikeduke'
          },
          {
            image: './assets/user-images/image-roxanne.jpg',
            name: 'Roxanne Travis',
            username: 'peppersprime32'
          },
          {
            image: './assets/user-images/image-victoria.jpg',
            name: 'Victoria Mejia',
            username: 'arlen_the_marlin'
          },
          {
            image: './assets/user-images/image-jackson.jpg',
            name: 'Jackson Barker',
            username: 'countryspirit'
          },
          {
            image: './assets/user-images/image-victoria.jpg',
            name: 'Victoria Mejia',
            username: 'arlen_the_marlin'
          },
          {
            image: './assets/user-images/image-jackson.jpg',
            name: 'Jackson Barker',
            username: 'countryspirit'
          },
          {
            image: './assets/user-images/image-suzanne.jpg',
            name: 'Suzanne Chang',
            username: 'upbeat1811'
          }
    ]

  const createCategories = async () => {
    await prisma.category.createMany({
        data: [
            { name: 'Bug' },
            { name: 'Enhancement' },
            { name: 'Feature' },
            { name: 'UI' },
            { name: 'UX' }
        ]
        })
    }

    const createStatus = async () => {
        await prisma.status.createMany({
        data: [
            { name: 'Suggestion' },
            { name: 'Planned' },
            { name: 'In-Progress' },
            { name: 'Live' },
        ]
        })
    }

    const createUsers = async () => {
        await prisma.user.createMany({
        data: users
    })
    }

    // const createComments = await prisma.comment.createMany({
    //     data: [
    //         {
    //             content: "I agree! It would be great to be able to search for solutions based on a specific stack.",
    //             user: {
    //                 connectOrCreate: {
    //                     where: {
    //                     }
    //                 }
    //             }
    //         }
    //     ]
    // })

    const createFeedback = async () => {
    data.productRequests.map(async (feedback) => {
        let randomUser = users[Math.floor(Math.random() * 10) + 1];

        const createFeedback = await prisma.feedback.create({
            data: {
                    title: feedback.title,
                    category: {
                        connectOrCreate: {
                            where: {
                                name: feedback.category
                            },
                            create: {
                                name: feedback.category
                            }
                        }
                    },
                    upvotes: feedback.upvotes,
                    status: {
                        connectOrCreate: {
                            where: {
                                name: feedback.status
                            },
                            create: {
                                name: feedback.status
                            }
                        }
                    },
                    description: feedback.description,
                    user: {
                        connectOrCreate: {
                            where: {
                                username: randomUser.username
                            },
                            create: {
                                image: randomUser.image,
                                name: randomUser.name,
                                username: randomUser.username
                            }
                        }
                    }
                }
        })

        if (feedback.comments !== undefined) {
            feedback.comments.map(async (comment) => {
                console.log(comment.user)
                const newComment = await prisma.comment.create({
                    data: {
                    content: comment.content,
                    user: {
                        connectOrCreate: {
                            where: {
                            username: comment.user.username
                            },
                            create: {
                                image: comment.user.image,
                                name: comment.user.name,
                                username: comment.user.username
                            }
                        }
                    },
                    feedback: {
                        connect: {
                            id: createFeedback.id
                        }
                    }
                    }
                    }   
                )

                if (comment.replies !== undefined) {
                    comment.replies.map(async (reply) => {
                        const newReply = await prisma.reply.create({
                            data: {
                                content: reply.content,
                                user: {
                                    connectOrCreate: {
                                        where: {
                                            username: reply.user.username
                                        },
                                        create: {
                                            image: reply.user.image,
                                            name: reply.user.name,
                                            username: reply.user.username
                                        }
                                    }
                                },
                                comment: {
                                    connect: {
                                        id: newComment.id
                                    }
                                }
                            }
                        })
                    })
                }
            })
        }
    })
}
    createCategories().then(() => {
        console.log('categories created')
        createStatus().then(() => {
            console.log('status created')
                createFeedback().then(() => {
                    console.log('feedback created')
                })
            })
    })


//     const createFeedback = await prisma.feedback.create({
//         data: {
//                 title: "Add tags for solutions",
//                 category: {
//                     connectOrCreate: {
//                         where: {
//                             name: "Enhancement"
//                         },
//                         create: {
//                             name: "Enhancement"
//                         }
//                     }
//                 },
//                 upvotes: 112,
//                 status: {
//                     connectOrCreate: {
//                         where: {
//                             name: "Suggestion"
//                         },
//                         create: {
//                             name: "Suggestion"
//                         }
//                     }
//                 },
//                 description: "Easier to search for solutions based on a specific stack.",
//                 user: {
//                     connectOrCreate: {
//                         where: {
//                             username: "velvetround"
//                         },
//                         create: {
//                             image: "./assets/user-images/image-zena.jpg",
//                             name: "Zena Kelley",
//                             username: "velvetround"
//                         }
//                     }
//                 }
//             }
// })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })