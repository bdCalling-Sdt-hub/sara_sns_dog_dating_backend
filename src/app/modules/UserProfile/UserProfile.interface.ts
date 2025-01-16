import { Model, Types } from 'mongoose';

export type TLocation = {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
};

export type TUserProfile = {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  address: string;
  email: string;
  mobile?: string;
  petsProfileId?: Types.ObjectId;
  location?: TLocation;
  lastLocationChangeAt?: Date;
};

export type UserProfileModel = Model<TUserProfile>;
