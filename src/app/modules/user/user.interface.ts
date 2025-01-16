import { Model, Types } from 'mongoose';

import { USER_ROLE } from './user.constants';

export interface TUserCreate {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
}

export interface TUser extends TUserCreate {
  _id: string;
  image: string;
  status: 'General' | 'Paid';
  isSubscribed: boolean;
  location?: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface DeleteAccountPayload {
  password: string;
}

export interface UserModel extends Model<TUser> {
  findMany(arg0: { _id: { $in: Types.ObjectId[]; }; }): unknown;
  isUserExist(email: string): Promise<TUser>;
  isUserActive(email: string): Promise<TUser>;
  IsUserExistById(id: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type IPaginationOption = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};
