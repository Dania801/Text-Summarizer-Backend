import { Router } from 'express';
import path from 'path';
import Multer from 'multer';
import Minio from 'minio';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { authLocal } from '../../services/auth.services';
import { authJwt } from '../../services/auth.services';
import { authTwitter, authTwitterCallback } from '../../services/twitter.services';
import * as userController from './user.controllers';
import { minioClient } from '../../services/minio.services';


const routes = new Router();

routes.post('/signup', userController.signup);
routes.post('/login', authLocal, userController.login);
routes.post('/:id/follow', authJwt ,userController.follow);
routes.patch('/update', authJwt, Multer({storage: Multer.memoryStorage()}).single("photo"), userController.update);
routes.get('/login/twitter', authTwitter);
routes.get('/auth/twitter/callback', authTwitterCallback, userController.twitterSignup);

export default routes;
