import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (event.method === 'GET') {
        return await prisma.category.findMany({ orderBy: { name: 'asc' } })
    }

    if (event.method === 'POST') {
        const body = await readBody(event)
        if (!body.name) {
            throw createError({ statusCode: 400, statusMessage: 'Le nom est requis' })
        }

        const exists = await prisma.category.findUnique({ where: { name: body.name } })
        if (exists) {
            throw createError({ statusCode: 409, statusMessage: 'Cette catégorie existe déjà' })
        }

        return await prisma.category.create({ data: { name: body.name } })
    }
})
