import AppError from '../../error/AppError';
import { TUserProfile } from '../UserProfile/UserProfile.interface';
import { UserProfile } from '../UserProfile/UserProfile.models';
import httpStatus from 'http-status';

const nearFriends = async (userId: string): Promise<TUserProfile[] | any> => {
  console.log(userId);
  const radiusInRadians: number = 10 / 6371;
  const userProfile = await UserProfile.findOne({ userId: userId });
  if (!userProfile) {
    throw new AppError(httpStatus.NOT_FOUND, 'User profile not found');
  }
  if (!userProfile?.location) {
    throw new AppError(httpStatus.NOT_FOUND, 'User location not set yet');
  }
  const {
    location: {
      coordinates: [userLongitude, userLatitude],
    },
  } = userProfile;

  const nearbyPets = await UserProfile.find({
    userId: { $ne: userId },
    location: {
      $geoWithin: {
        $centerSphere: [[userLongitude, userLatitude], radiusInRadians], // Coordinates must be [longitude, latitude]
      },
    },
  }).populate('petsProfileId');
  return nearbyPets;
};

// const nearFriends = async (userId: string): Promise<TUserProfile[] | any> => {
//   console.log(userId);
//   const radiusInRadians: number = 10 / 6371; // Radius of 10 km, Earth's radius is ~6371 km
//   const userProfile = await UserProfile.findOne({ userId: userId });
//   if (!userProfile) {
//     throw new AppError(httpStatus.NOT_FOUND, 'User profile not found');
//   }
//   if (!userProfile?.location) {
//     throw new AppError(httpStatus.NOT_FOUND, 'User location not set yet');
//   }

//   const {
//     location: {
//       coordinates: [userLongitude, userLatitude],
//     },
//   } = userProfile;

//   // Use aggregation pipeline to calculate distance
//   const nearbyPets = await UserProfile.aggregate([
//     {
//       $geoNear: {
//         near: { type: 'Point', coordinates: [userLongitude, userLatitude] },
//         distanceField: 'distanceOfFriend', // Field to store calculated distance
//         spherical: true, // Use spherical calculation
//         maxDistance: radiusInRadians * 6371000, // Convert radiusInRadians to meters
//       },
//     },
//     {
//       $match: {
//         userId: { $ne: userId }, // Exclude the current user
//       },
//     },
//     {
//       $lookup: {
//         from: 'petsProfiles', // Replace 'petsProfiles' with the actual collection name
//         localField: 'petsProfileId',
//         foreignField: '_id',
//         as: 'petsProfile',
//       },
//     },
//   ]);

//   return nearbyPets;
// };

/**
 * Add new product(s) with sequential product IDs.
 */

export const NearFriendService = {
  nearFriends,
};
