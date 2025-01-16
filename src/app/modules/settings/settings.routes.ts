import express from 'express';
import { settingsController } from './settings.controller';

const router = express.Router();

router.post(
  '/',
  // auth(USER_ROLE.ADMIN),
  settingsController.addSetting,
);
router.get('/', settingsController.getSettings);
router.patch('/', settingsController.updateSetting);

export const SettingsRoutes = router;
