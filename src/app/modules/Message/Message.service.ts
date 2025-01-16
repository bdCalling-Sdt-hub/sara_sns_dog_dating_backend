import AppError from '../../error/AppError';
import { Chat } from '../Chat/Chat.models';
import { TMessage } from './Message.interface';
import { Message } from './Message.models';

const SendNewMessage = async (
  file: Express.Multer.File,
  payload: TMessage,
): Promise<TMessage> => {
  if (file) {
    const ImageUrl = file.path.replace('public\\', '');
    payload.image = ImageUrl;
  }

  console.log(payload);

  const existingChat = await Chat.findById(payload.chat);
  if (!existingChat) {
    throw new AppError(404, 'Chat not found');
  }
  const newMessage = await Message.create(payload);

  const existingUnreadCounts: { [key: string]: number } =
    existingChat?.unreadCountes || {};

  if (existingChat) {
    existingChat.users.forEach((user: any) => {
      if (user !== payload.sender) {
        existingUnreadCounts[user] = (existingUnreadCounts[user] || 0) + 1;
      }
    });

    await Chat.findByIdAndUpdate(payload.chat, {
      lastMessage: newMessage._id,
      unreadCounts: existingUnreadCounts,
      lastMessageAt: new Date().toISOString(),
    });
  }

  return newMessage;
};

const GetChatMessages = async (chatId: string): Promise<TMessage[]> => {
  return await Message.find({ chat: chatId })
    .populate('sender')
    .populate({ path: 'chat', populate: { path: 'users' } })
    .populate('readBy')
    .populate('')
    .sort({ createdAt: 1 });
};

const ReadAllMessages = async (
  userId: string,
  chatId: string,
): Promise<void> => {
  console.log(userId, chatId);

  await Message.updateMany(
    {
      chat: chatId,
      readBy: { $nin: [userId] },
    },
    { $addToSet: { readBy: userId } },
  );

  const existingChat = await Chat.findById(chatId);

  if (existingChat) {
    const updatedUnreadCounts = { ...existingChat.unreadCountes, [userId]: 0 };
    await Chat.findByIdAndUpdate(chatId, {
      unreadCounts: updatedUnreadCounts,
    });
  }
};

export const MessageService = {
  SendNewMessage,
  GetChatMessages,
  ReadAllMessages,
};
