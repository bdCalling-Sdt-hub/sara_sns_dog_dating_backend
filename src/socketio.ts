/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { Chat } from './app/modules/Chat/Chat.models';
import { Message } from './app/modules/Message/Message.models';

async function getChatById(chatId) {
  try {
    const chat = await Chat.findById(chatId).populate('users').exec();
    if (!chat) {
      throw new Error(`Chat with ID ${chatId} not found`);
    }
    return chat;
  } catch (error) {
    console.error('Error fetching chat:', error);
    throw error; // Rethrow to handle it in the calling function
  }
}

const initializeSocketIO = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  // Online users
  let onlineUsers: string[] = [];

  io.on('connection', async (socket) => {
    // console.log({ socket });
    console.log('room -> ', socket.rooms);
    console.log('connected', socket?.id);

    try {
      socket.on('join', (chatId) => {
        socket.join(chatId);
        console.log('socket id from join ->', { userId });
        // if (!socket.rooms.has(userId)) {
        //   console.log({ userId });

        //   console.log('join data -> ', socket.join);
        //   if (!onlineUsers.includes(userId)) {
        //     onlineUsers.push(userId);
        //   }
        // }

        // onlineUsers.forEach((user) => {
        //   io.to(user).emit('online-users-updated', onlineUsers);
        // });

        console.log('Online Users', onlineUsers);
      });

      socket.on('send-new-message', async (message) => {
        console.log('new message ====>', { message });
        // message?.chat?.users?.forEach((user: any) => {
        //   console.log({ user });
        //   io.to(user._id).emit('new-message-received', message);
        // });

        console.log('check maren vai doya koirra', message?.chat);

        try {
          // Assuming `getChatById` fetches the chat object including the users array
          const chat = await getChatById(message.chat);

          console.log({ chat });
          console.log(chat.users);
          let newMessage: any;
          if (chat) {
            newMessage = await Message.create(message);
            console.log({ newMessage });
          }
          console.log('new-message-received::', message.chat);
          // socket.emit(`new-message-received::${message.chat}`, newMessage);
          socket.emit(`new-message-received`, newMessage);

          // await chat.users.forEach((user) => {
          //   console.log(newMessage, ' new message for receiver');
          //   // io.to(user._id).emit('new-message-received', newMessage);
          //   socket.emit(`new-message-received::${message.chat}`, newMessage);
          // });
          // // Now you can loop through the users and emit to each
          // chat.users.forEach((user) => {
          //   console.log('Emitting to user:', user._id);
          //   io.to(user._id).emit('new-message-received', message);
          // });
        } catch (error) {
          console.error('Error fetching chat details:', error);
        }
      });

      // Leave a chat room
      socket.on('leave', (chatId) => {
        console.log(`${socket.id} left room ${chatId}`);
        socket.leave(chatId);
      });

      socket.on('read-all-messages', ({ chatId, users, readByUserId }) => {
        users.forEach((user: string) => {
          io.to(user).emit('user-read-all-chat-messages', {
            chatId,
            readByUserId,
          });
        });
      });

      socket.on('typing', ({ chat, senderId, senderName }) => {
        chat.users.forEach((user: any) => {
          if (user._id !== senderId) {
            io.to(user._id).emit('typing', { chat, senderName });
          }
        });
      });

      socket.on('logout', (userId) => {
        socket.leave(userId);
        onlineUsers = onlineUsers.filter((user) => user !== userId);

        onlineUsers.forEach((user) => {
          io.to(user).emit('online-users-updated', onlineUsers);
        });
      });

      //-----------------------Disconnect------------------------//
      socket.on('disconnect', () => {
        console.log('disconnect user ', socket.id);
      });
    } catch (error) {
      console.error('-- socket.io connection error --', error);
    }
  });

  return io;
};

export default initializeSocketIO;
