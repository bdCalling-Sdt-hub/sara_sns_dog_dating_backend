import { Schema, model } from 'mongoose';
import { MessageModel, TMessage } from './Message.interface';

const messageSchema = new Schema<TMessage, MessageModel>(
  {
    socketMessageId: {
      type: String,
      // required: true,
      default: '',
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat', // Reference to Chat model
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
    text: {
      type: String,
      default: null, // Default to null if no text is provided
    },
    image: {
      type: String,
      default: null, // Default to null if no image is provided
    },
    // document: {
    //   type: String,
    //   default: null, // Default to null if no document is provided
    // },
    readBy: {
      type: [Schema.Types.ObjectId],
      ref: 'User', // Reference to User model
      default: [], // Initialize as an empty array
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
    toJSON: { virtuals: true }, // Enable virtual fields in JSON output
  },
);

export const Message = model<TMessage, MessageModel>('Message', messageSchema);
