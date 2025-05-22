import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const id = parseInt(getRouterParam(event, 'id') || '')

    if (isNaN(id)) {
        throw createError({ statusCode: 400, statusMessage: 'ID invalide' })
    }

    const existing = await prisma.category.findUnique({ where: { id } })
    if (!existing) {
        throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable' })
    }

    await prisma.category.delete({ where: { id } })

    return { success: true }
})
