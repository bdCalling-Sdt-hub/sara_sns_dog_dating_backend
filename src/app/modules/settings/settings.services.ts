import { TSettings } from './settings.interface';
import { Settings } from './settings.models';

const addSettings = async (
  data: Partial<TSettings>,
): Promise<TSettings | undefined | null> => {
  const existingSettings = await Settings.find({});
  if (existingSettings.length > 1) {
    const result = await Settings.findOneAndUpdate({}, data, {
      new: true,
      runValidators: true,
    });
    return result;
  }
  const result = await Settings.create(data);
  return result;
};

//   if (existingSettings) {
//     return existingSettings;
//   } else {
//     const result = await Settings.create(data);

// if (!result) {
//   throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add settings');
// }
// return null;
// }

const getSettings = async (
  title?: keyof TSettings,
): Promise<{ content?: string } | TSettings | null> => {
  const settings = await Settings.findOne().select(title as string);

  if (title) {
    return { content: settings ? settings[title] : undefined }; // Check if settings exists
  } else {
    return settings;
  }
};

// Function to update settings without needing an ID
const updateSettings = async (
  settingsBody: Partial<TSettings>,
): Promise<TSettings | null> => {
  // Find the existing settings document and update it
  const settings = await Settings.findOneAndUpdate({}, settingsBody, {
    new: true,
  });

  return settings;
};

export const settingsService = {
  addSettings,
  updateSettings,
  getSettings,
};
