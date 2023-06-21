import * as authRepos from '../repositories/authRepositories';
import { comparePasswords, hashPassword } from '../utils/bcrypt';
import { createToken } from '../utils/jwtUtil';
import { conflict, unauthorized } from '../utils/throwErrors';

export async function signUp(user: { firstname: string; lastname: string; email: string; password: string }) {
  const emailResult = await authRepos.findUserByEmail(user.email);
  if (emailResult !== null) throw conflict('E-mail já se encontra cadastrado!');

  const passwordHashed = await hashPassword(user.password);

  return await authRepos.recordUser({ ...user, password: passwordHashed });
}

export async function signIn(user: { email: string; password: string }) {
  const emailResult = await authRepos.findUserByEmail(user.email);
  if (emailResult === null) throw unauthorized('E-mail ou senha está incorreto!');

  const comparePassword = await comparePasswords(user.password, emailResult.password);
  if (comparePassword === false) throw unauthorized('E-mail ou senha está incorreto!');

  return createToken({ email: emailResult.email });
}
