import { Router } from 'express';
import * as authControllers from '../controllers/authControllers';
import validateSchemas from '../middlewares/validateSchemas';
import { signUpSchema, signInSchema } from '../schemas/authentication';

const authRoutes = Router();

authRoutes.post('/signup', validateSchemas(signUpSchema), authControllers.signUpController);

authRoutes.post('/signin', validateSchemas(signInSchema), authControllers.signInController);

export default authRoutes;
