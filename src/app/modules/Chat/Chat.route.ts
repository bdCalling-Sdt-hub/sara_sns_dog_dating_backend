import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';
import { ChatController } from './Chat.controller';

const router = express.Router();

// Add a new chat
router.post(
  '/add',
  // auth(USER_ROLE.ADMIN), // Authorization middleware
  FileUploadHelper.upload.single('file'), // Single file uploads
  (req: Request, res: Response, next: NextFunction) => {
    console.log('before data add new chat -> ', req.body);
    console.log('before data add new file -> ', req.file);
    // req.body = productValidations.addProductValidationSchema.parse(
    //   JSON.parse(req.body.data),
    // );
    console.log(JSON.parse(req.body.data));
    return ChatController.addNewChat(req, res, next);
  },
  // validateRequest(productValidations.addProductValidationSchema),
  ChatController.addNewChat,
);

router.patch(
  '/leave-chat/:chatId',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  ChatController.leaveUserFromSpecificChatController,
);

// Get all chats for a user
router.get(
  '/user/:userId',
  (req: Request, res: Response, next: NextFunction) => {
    return ChatController.getUserChats(req, res, next);
  },
);

// Get a single chat by ID
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  return ChatController.getChatById(req, res, next);
});

router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  return ChatController.updateChatById(req, res, next);
});

// Update unread counts
router.patch(
  '/:id/unread',
  (req: Request, res: Response, next: NextFunction) => {
    return ChatController.updateUnreadCounts(req, res, next);
  },
);

// Delete a chat
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  return ChatController.deleteChat(req, res, next);
});

export const ChatRoutes = router;
