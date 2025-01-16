import { Model, Types } from 'mongoose';

export type TChat = {
  users: Types.ObjectId[]; // Users in the chat
  createdBy: Types.ObjectId; // User who created the chat
  lastMessage: Types.ObjectId; // Reference to the last message
  isGroupChat: boolean; // Whether the chat is a group chat
  groupName?: string; // Name of the group chat
  groupProfilePicture?: string; // Profile picture for the group chat
  groupBio?: string; // Bio or description for the g roup chat
  groupAdmins: Types.ObjectId[]; // Admins of the group chat
  unreadCountes: {}; // Dynamic unread counts for users
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for updates
};

export type ChatModel = Model<TChat>;
