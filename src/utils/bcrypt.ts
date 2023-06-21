import { hash, compare } from 'bcrypt';

export async function hashPassword(password: string) {
  const saltRounds = 15;

  const passwordCrypted = hash(password, saltRounds);

  return passwordCrypted;
}

export async function comparePasswords(passwordToValidate: string, passwordCrypted: string) {
  const result = await compare(passwordToValidate, passwordCrypted);

  if (result === false) return false;

  return true;
}
