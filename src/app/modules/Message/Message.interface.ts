import { Model, Types } from 'mongoose';

export type TMessage = {
  socketMessageId?: string;
  chat: Types.ObjectId; // Reference to Chat
  sender: Types.ObjectId; // Sender of the message
  text?: string; // Optional text content
  image?: string; // Optional image URL
  // document?: string; // Optional document URL
  readBy: Types.ObjectId[]; // Users who have read the message
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for updates
};

export type MessageModel = Model<TMessage>;
