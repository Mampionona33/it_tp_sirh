/**
 * Run this commande inside api folder to execute the scirpt
 * npx ts-node ./prisma/script.ts
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  const newCotisation = await prisma.cotisations.create({
    data: {
      libelle: 'Cotisation OMSI',
      type: 'OMSI',
      employeur: 0.1,
      modeDePayement: 'Virement bancaire',
      salarie: 0.1,
    },
  })
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
