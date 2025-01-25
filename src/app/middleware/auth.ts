import httpStatus from 'http-status';
import config from '../config/index';
import AppError from '../error/AppError';
import { User } from '../modules/user/user.models';
import catchAsync from '../utils/catchAsync';
import { verifyToken } from '../utils/tokenManage';

const auth = (...userRoles: string[]) => {
  return catchAsync(async (req, res, next) => {
    // console.log('request data ======= > ', req);
    console.log('headers ======= > ', req.headers.authorization);
    const token = req?.headers?.authorization?.split(' ')[1];
    // const token = req?.headers?.authorization;

    console.log({ token });
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized!');
    }

    const decodeData = verifyToken({
      token,
      access_secret: config.jwt_access_secret as string,
    });

    console.log('decoded data =====> ', { decodeData, userRoles });

    const { role, userId } = decodeData;
    const isUserExist = await User.IsUserExistById(userId);

    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'user not found');
    }

    if (userRoles && !userRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized....');
    }
    req.user = decodeData;
    next();
  });
};
export default auth;
