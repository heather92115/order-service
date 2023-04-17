import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

// Prisma does not log query params by default
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
});

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function main() {

  try {
    const statuses = [{s: 'new', t: false}, {s: 'ins', t: false}, {s: 'dur', t: false}, {s: 'pv1', t: false}, {s: 'pv2', t: false}, {s: 'shipping', t: false},
      {s: 'error', t: false}, {s: 'completed', t: true}, {s: 'cancelled', t: true}, {s: 'voided', t: true}];

    for (let index = 0; index < statuses.length; index++) {
      const status = statuses[index];
      await prisma.orderStatus.upsert({
        create: {
          id: index,
          status: status.s,
          terminal: status.t,
        },
        where: {
          id: index,
        },
        update: {},
      });
    }

  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
