import { Model, Types } from 'mongoose';

export type TDonation = {
  userId: Types.ObjectId;
  name: string;
  amount: number;
  email: string;
  transectionId: string;
  cratedAt: Date;
  updatedAt: Date;
};

export type DonationModel = Model<TDonation>;
