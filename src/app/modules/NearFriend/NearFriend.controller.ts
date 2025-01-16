import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NearFriendService } from './NearFriend.service';

const nearFriends = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const Shelter = await NearFriendService.nearFriends(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Near Friends retrieved successfully!',
    data: Shelter,
  });
});

export const NearFriendController = {
  nearFriends,
};
