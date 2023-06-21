import dbClient from '../../prisma/dbClient';

export async function findUserByEmail(email: string) {
  return dbClient.user.findUnique({ where: { email } });
}

export async function recordUser(user: { firstname: string; lastname: string; email: string; password: string }) {
  return dbClient.user.create({ data: user });
}
