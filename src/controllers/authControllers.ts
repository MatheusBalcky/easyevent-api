import { Request, Response } from 'express';
import * as authServices from '../services/authServices';

export async function signUpController(req: Request, res: Response) {
  await authServices.signUp(req.body);

  return res.status(200).send('Conta criada com sucesso!');
}

export async function signInController(req: Request, res: Response) {
  const token = await authServices.signIn(req.body);
  res.cookie('token', token, { httpOnly: false });
  res.status(200).send({
    message: 'logado com sucesso',
    time: new Date()
  });
}
