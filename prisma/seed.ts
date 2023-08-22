import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const ips = [
    '127.0.0.1',
    '::1',
    'localhost',
    '::ffff:127.0.0.1'
  ];

  for (const ip of ips) {
    await prisma.ipWhitelist.upsert({
      where: { ip_address: ip },
      update: {},
      create: { ip_address: ip }
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
