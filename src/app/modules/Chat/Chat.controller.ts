import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChatService } from './Chat.service';
import { PetProfile } from '../PetProfile/PetProfile.models';

const addNewChat = catchAsync(async (req: Request, res: Response) => {
  console.log('req body -> ', req.body);
  const UserProfileData = JSON.parse(req.body.data);
  console.log({ UserProfileData });
  const file = req?.file as Express.Multer.File;
  console.log({ file });
  const result = await ChatService.addNewChat(file, UserProfileData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Chat is created successfully!',
    data: result,
  });
});

const leaveUserFromSpecificChatController = catchAsync(
  async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const userId = req.user.userId;

    console.log('req user = > ', req.user);
    const payload = {
      chatId,
      userId
    }

    const PetProfileData = await PetProfile.findOne({userId}).select("name")
    
    console.log({payload})
    const result = await ChatService.leaveUserFromSpecific(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: `${PetProfileData?.name} has leave the chat...`,
      data: result,
    });
  },
);

const updateChatById = catchAsync(async (req: Request, res: Response) => {
  const UserProfileData = req.body;
  const file = req?.file as Express.Multer.File;
  const { id } = req.params;
  const result = await ChatService.updateChatById(id, file, UserProfileData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'New UserProfile added successfully!',
    data: result,
  });
});

const getUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chats = await ChatService.getUserChats(req.params.userId);
    res.status(200).json({
      success: true,
      message: 'Chats retrieved successfully!',
      data: chats,
    });
  } catch (error) {
    next(error);
  }
};

const getChatById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chat = await ChatService.getChatById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Chat retrieved successfully!',
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

const updateUnreadCounts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { userId, unreadCount } = req.body;
    const updatedChat = await ChatService.updateUnreadCounts(
      id,
      userId,
      unreadCount,
    );
    res.status(200).json({
      success: true,
      message: 'Unread counts updated successfully!',
      data: updatedChat,
    });
  } catch (error) {
    next(error);
  }
};

const deleteChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chat = await ChatService.deleteChat(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Chat deleted successfully!',
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

export const ChatController = {
  addNewChat,
  leaveUserFromSpecificChatController,
  getUserChats,
  getChatById,
  updateUnreadCounts,
  deleteChat,
  updateChatById,
};
