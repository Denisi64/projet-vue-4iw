import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

    const admin = await prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'test1234',
            role: 'ADMIN',
        }
    })

    const user = await prisma.user.create({
        data: {
            name: 'User1',
            email: 'user1@example.com',
            password: 'hashed_pw_user1',
            role: 'USER',
        }
    })

    const meme = await prisma.category.create({
        data: { name: 'Meme' }
    })

    const ia = await prisma.category.create({
        data: { name: 'ia' }
    })



    console.log('Fixtures insérées avec succès ✅')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())
