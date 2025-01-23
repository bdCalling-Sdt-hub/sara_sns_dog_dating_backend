import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { ChatRoutes } from '../modules/Chat/Chat.route';
import { DonationRoutes } from '../modules/Donation/Donation.route';
import { MessageRoutes } from '../modules/Message/Message.route';
import { NearFriendRoutes } from '../modules/NearFriend/NearFriend.route';
import { NotificationRoutes } from '../modules/notification/notification.route';
import { OtpRoutes } from '../modules/otp/otp.routes';
import { PaymentRoutes } from '../modules/Payment/Payment.route';
import { petProfileRoutes } from '../modules/PetProfile/PetProfile.route';
import { ProductsRoutes } from '../modules/Product/Product.route';
import { SettingsRoutes } from '../modules/settings/settings.routes';
import { ShelterRoutes } from '../modules/Shelter/Shelter.route';
import { userRoutes } from '../modules/user/user.route';
import { UserProfileRoutes } from '../modules/UserProfile/UserProfile.route';
import { supportRoutes } from '../modules/Support/support.route';

// import { ProductsRoutes } from '../modules/Product/Product.route';
// import { ShelterRoutes } from '../modules/Shelter/Shelter.route';
// import { DonationRoutes } from '../modules/Donation/Donation.route';
// import { UserProfileRoutes } from '../modules/UserProfile/UserProfile.route';
// import { petProfileRoutes } from '../modules/PetProfile/PetProfile.route';
// import { PaymentRoutes } from '../modules/Payment/Payment.route';
// import { NearFriendRoutes } from '../modules/NearFriend/NearFriend.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/otp',
    route: OtpRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
  {
    path: '/settings',
    route: SettingsRoutes,
  },
  {
    path: '/products',
    route: ProductsRoutes,
  },
  {
    path: '/shelter',
    route: ShelterRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/donation',
    route: DonationRoutes,
  },
  {
    path: '/user-profile',
    route: UserProfileRoutes,
  },
  {
    path: '/pet-profile',
    route: petProfileRoutes,
  },
  {
    path: '/near-friends',
    route: NearFriendRoutes,
  },
  {
    path: '/chat',
    route: ChatRoutes,
  },
  {
    path: '/message',
    route: MessageRoutes,
  },
  {
    path: '/contactUs',
    route: supportRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
