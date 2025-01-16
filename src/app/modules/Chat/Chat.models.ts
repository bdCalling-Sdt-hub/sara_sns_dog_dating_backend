import { Schema, model } from 'mongoose';
import { ChatModel, TChat } from './Chat.interface';

const chatSchema = new Schema<TChat, ChatModel>(
  {
    users: {
      type: [Schema.Types.ObjectId],
      ref: 'User', // Reference to User model
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: 'Message', // Reference to Message model
    },
    isGroupChat: {
      type: Boolean,
      default: false, // Default to individual chat
    },
    groupName: {
      type: String,
      default: null, // Optional group name
    },
    groupProfilePicture: {
      type: String,
      default: null, // Optional group profile picture
    },
    groupBio: {
      type: String,
      default: null, // Optional group bio
    },
    groupAdmins: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: 'User', // Reference to User model
    },
    unreadCountes: {
      type: Object, // Dynamic structure for unread counts
      default: {}, // Initialize as an empty object
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
    toJSON: { virtuals: true }, // Enable virtual fields in JSON output
  },
);

export const Chat = model<TChat, ChatModel>('Chat', chatSchema);
