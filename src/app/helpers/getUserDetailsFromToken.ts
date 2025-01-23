import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../error/AppError';
import config from '../config';
import { User } from '../modules/user/user.models';

const getUserDetailsFromToken = async (token: string) => {
  console.log("token from getUserDetails -> ", token)
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized!');
  }

  let decode: any;
  // console.log(config.jwt_access_secret)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  try {
     decode = await jwt.verify(
      token,
      config.jwt_access_secret as string,
      { algorithms: ['HS256'] },
    );
  } catch (error) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,'Invalid or expired token...!',
    );
  }

  // console.log({decode})
  const user = await User.findById(decode.userId).select('-password');
  return user;
};

export default getUserDetailsFromToken;
