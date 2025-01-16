import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import validateRequest from '../../middleware/validateRequest';
import { ChatController } from './Chat.controller';
import { productValidations } from './Chat.validation';

const router = express.Router();

// Add a new chat
router.post(
  '/add',
  // auth(USER_ROLE.ADMIN), // Authorization middleware
  FileUploadHelper.upload.single('file'), // Single file uploads
  (req: Request, res: Response, next: NextFunction) => {
    req.body = productValidations.addProductValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return ChatController.addNewChat(req, res, next);
  },
  validateRequest(productValidations.addProductValidationSchema),
  ChatController.addNewChat,
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
