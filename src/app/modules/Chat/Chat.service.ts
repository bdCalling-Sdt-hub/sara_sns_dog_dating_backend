import { User } from '../user/user.models';
import { TChat } from './Chat.interface';
import { Chat } from './Chat.models';

const addNewChat = async (
  file: Express.Multer.File,
  data: TChat,
): Promise<TChat> => {
  console.log(data);

  // Check if the creator exists
  const isCreatorExist = await User.findOne({ _id: data?.createdBy });
  if (!isCreatorExist) {
    throw new Error('Creator not found');
  }

  // Check if all users in the chat exist
  const foundUsers = await User.find({ _id: { $in: data?.users } });
  if (foundUsers.length !== data?.users.length) {
    throw new Error('One or more users not found');
  }

  // If it's a group chat, perform additional validations
  if (data?.isGroupChat === true) {
    if (!data?.groupName) {
      throw new Error('Group Name is required');
    }

    if (!file) {
      throw new Error('Group Profile Picture is required');
    }
    // Assign the group profile picture URL
    const imageUrl = file.path.replace('public\\', '');
    data.groupProfilePicture = imageUrl;

    if (!data?.groupBio) {
      throw new Error('Group Bio is required');
    }

    if (!data?.groupAdmins || data.groupAdmins.length === 0) {
      throw new Error('Group Admins are required');
    }

    // Check if all group admins exist
    const foundAdmins = await User.find({ _id: { $in: data?.groupAdmins } });
    if (foundAdmins.length !== data?.groupAdmins.length) {
      throw new Error('One or more group admins not found');
    }
  }

  // Create the chat in the database
  const result = await Chat.create(data);
  return result;
};

const getUserChats = async (userId: string): Promise<TChat[]> => {
  const result = await Chat.find({
    users: {
      $in: [userId],
    },
  })
    .populate('lastMessage')
    .populate('lastMessage')
    .populate('createdBy')
    .populate('groupAdmins')
    .populate('users')
    .sort({ createdAt: -1 });

  return result;
};

const getChatById = async (id: string): Promise<TChat | null> => {
  return await Chat.findById(id)
    .populate('lastMessage users')
    .populate('lastMessage')
    .populate('createdBy')
    .populate('groupAdmins');
};

const updateUnreadCounts = async (
  chatId: string,
  userId: string,
  unreadCount: number,
): Promise<TChat | null> => {
  return await Chat.findByIdAndUpdate(
    chatId,
    { [`unreadCountes.${userId}`]: unreadCount },
    { new: true },
  );
};
const updateChatById = async (
  chatId: string,
  file: Express.Multer.File,
  data: TChat,
): Promise<TChat | null> => {
  const isChatExist = await Chat.findById(chatId);
  if (!isChatExist) {
    throw new Error('Chat not found');
  }
  if (data?.isGroupChat === true) {
    if (file) {
      const ImageUrl = file.path.replace('public\\', '');
      data.groupProfilePicture = ImageUrl;
    }
  }

  const result = await Chat.findByIdAndUpdate(chatId, data, {
    new: true,
  });
  return result;
};

const deleteChat = async (id: string): Promise<TChat | null> => {
  return await Chat.findByIdAndDelete(id);
};

export const ChatService = {
  addNewChat,
  getUserChats,
  getChatById,
  updateUnreadCounts,
  deleteChat,
  updateChatById,
};
