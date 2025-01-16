import { Model } from 'mongoose';

export type TShelter = {
  name: string;
  image: string;
  age: number;
  gender: 'male' | 'female';
  size: string;
  city: string;
  description: string;
  shelterLink: string;
};

export type ShelterModel = Model<TShelter>;
