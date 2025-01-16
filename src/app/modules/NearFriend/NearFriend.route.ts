import express, { NextFunction, Request, Response } from 'express';

import { USER_ROLE } from '../user/user.constants';
import auth from '../../middleware/auth';
import { NearFriendController } from './NearFriend.controller';

const router = express.Router();

router.get(
  '/:id',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  NearFriendController.nearFriends,
);

export const NearFriendRoutes = router;
