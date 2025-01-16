import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MessageService } from './Message.service';

const SendNewMessage = catchAsync(async (req: Request, res: Response) => {
  const Data = req.body;
  const file = req?.file as Express.Multer.File;
  console.log(Data);
  const result = await MessageService.SendNewMessage(file, Data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Message sent successfully!',
    data: result,
  });
});

const GetChatMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const messages = await MessageService.GetChatMessages(req.params.chatId);
    res.status(200).json({
      success: true,
      message: 'Messages retrieved successfully!',
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

const ReadAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, chatId } = req.body;
    const message = await MessageService.ReadAllMessages(userId, chatId);
    res.status(200).json({
      success: true,
      message: 'Message marked as read!',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export const MessageController = {
  SendNewMessage,
  GetChatMessages,
  ReadAllMessages,
};
