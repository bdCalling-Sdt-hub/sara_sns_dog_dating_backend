/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import getUserDetailsFromToken from './app/helpers/getUserDetailsFromToken';
import { Chat } from './app/modules/Chat/Chat.models';
import { Message } from './app/modules/Message/Message.models';
import { User } from './app/modules/user/user.models';
import { PetProfile } from './app/modules/PetProfile/PetProfile.models';

async function getChatById(chatId: string) {

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
  const connectedSocket = new Map();

  try {
    io.on('connection', async (socket) => {
      // console.log({ socket });
      // console.log('room -> ', socket.rooms);
      console.log('connected', socket?.id);

      //----------------------user token get from front end-------------------------//

      // console.log("socket -> ", socket)

      const token = socket.handshake.auth.token || socket.handshake?.headers?.token as string;

      // console.log('konojhoi', socket.handshake);

      if (!token) {
        socket.emit('io-error', {
          success: false,
          message: 'please provide token... ',
        });
        socket.disconnect();
        return;
        // console.error('Error fetching chat details:');
        // throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized!');
      }

      // // console.log({ token });
      // //----------------------check Token and return user details-------------------------//
      const user: any = await getUserDetailsFromToken(token);

      // console.log({ user });

      // console.log({ user });
      if (!user) {
        socket.emit('io-error', { success: false, message: 'invalid Token' });
        socket.disconnect()
        return
      }

      // connectedSocket.set(user._id.toString(), socket);

      // console.log({ connectedSocket });

      try {
        socket.on('join', (data) => {
          console.log('....... chat id ........');
          console.log({ data });
          socket.join(data);
          // console.log('socket id from join ->', { userId });
          // if (!socket.rooms.has(userId)) {
          //   console.log({ userId });

          //   console.log('join data -> ', socket.join);
          //   if (!onlineUsers.includes(userId)) {
          //     onlineUsers.push(userId);
          //   }
          // }
          const userId = user._id.toString();

          if (!onlineUsers.includes(userId)) {
            onlineUsers.push(userId);
          }

          // onlineUsers.forEach((user) => {
          //   io.to(user).emit('online-users-updated', onlineUsers);
          // });
          io.emit('online-users-updated', onlineUsers);

          console.log('Online Users', onlineUsers);
        });

        socket.on('send-new-message', async (message) => {
          console.log('new message ====>', { message });

          try {
            // Assuming `getChatById` fetches the chat object including the users array
            const chat = await getChatById(message.chat);

            // console.log({ chat });
            // console.log(chat.users);
            let newMessage: any;
            let userData;
            if (chat) {
              newMessage = await Message.create(message);
              console.log({ newMessage });

              if(message?.sender === null){

              }
              else{
               userData = await User.findById(message?.sender).select('image fullName' );
               await Chat.findByIdAndUpdate(message.chat, {
                 lastMessage: newMessage._id,
               });
              }
              console.log({userData})
            }
            // console.log(message?.chat);
            const chatId = message?.chat;
            console.log({...message, userData});
      
            const petProfileData = await PetProfile.findOne({ userId: message?.sender});

            console.log({petProfileData})

            message.name = petProfileData?.name;
            message.image = petProfileData?.image;

            console.log({message})
            
            // console.log('new-message-received::', message.chat);
            // /socket.emit(`new-message-received::${message.chat}`, newMessage);
            socket
              .to(chatId)
              .emit(`new-message-received::${message?.chat}`, message);
            socket.emit(`new-message-received::${message?.chat}`, message);
          } catch (error) {
            console.error('Error fetching chat details:', error);
          }
        });

        // Leave a chat room
        socket.on('leave', (chatId, callback) => {
          console.log(`${socket.id} left room ${chatId}`);

          socket
            .to(chatId)
            .emit(`leave::${chatId}`, `${user.name} leave from  this chat...`);
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
  } catch (error) {}

  return io;
};

export default initializeSocketIO;
