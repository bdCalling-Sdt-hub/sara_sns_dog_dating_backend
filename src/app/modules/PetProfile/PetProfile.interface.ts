import { Model, Types } from 'mongoose';
export type TLocation = {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
};

export type TPetProfile = {
  userId: Types.ObjectId;
  userProfileId: Types.ObjectId;
  name: string;
  image?: string;
  address: string;
  age: number;
  gender: 'male' | 'female';
  size:
    | 'Extra Small (0-10 lbs)'
    | 'Small (10-30 lbs)'
    | 'Medium (30-55 lbs)'
    | 'Large (55-80 lbs)'
    | 'Extra Large (80+ lbs)';
  neuteredSpayed: 'Yes' | 'No';
  howDoYouPlay:
    | 'I’m new to play, and can be shy'
    | 'Low speed; let’s hang out'
    | 'High Speed; I love to chase/be chased'
    | 'Focused Play; throw the ball!'
    | 'Always herding'
    | ' Assertive; I need to be the boss';
  doYouLikeACrowd:
    | 'I prefer one friend at a time'
    | 'I’m comfortable with small groups'
    | 'I run with the pack!';
  playSizePreferences:
    | 'I’m comfortable with friends my own size'
    | 'I prefer medium - big dogs'
    | 'I prefer small - medium dogs (we love the short kings/queens!)';
  locationPreferences:
    | 'backyard/home playdate'
    | 'neighborhood walk'
    | 'trail/hike'
    | 'I’m comfortable in any crowd';
  description: string;
};

export type PetProfileModel = Model<TPetProfile>;
