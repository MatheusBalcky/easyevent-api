import { z } from "zod";

export const signUpSchema = z.object({
  firstname: z
    .string()
    .regex(/^[A-Za-z0-9]{1,26}$/, { message: "Primeiro nome inválido digite apenas letras e números!" })
    .regex(/^(?=.*[A-Za-z])[A-Za-z0-9._-]{1,26}$/, { message: "O nome precisar ter no mínimo 1 letra!" }),
  lastname: z
    .string()
    .regex(/^[A-Za-z0-9]{1,26}$/, { message: "Sobrenome nome inválido digite apenas letras e números!" })
    .regex(/^(?=.*[A-Za-z])[A-Za-z0-9._-]{1,26}$/, { message: "O sobrenome precisar ter no mínimo 1 letra!" }),
  email: z.string().email({ message: "E-mail inválido!" }),
  password: z.string().min(6, { message: "A senha precisa ter no mínimo 6 caracteres!" }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "E-mail inválido!" }),
  password: z.string().min(6, { message: "Senha ou e-mail estão incorretos!" }),
});

export type signUpI = z.infer<typeof signUpSchema>;
