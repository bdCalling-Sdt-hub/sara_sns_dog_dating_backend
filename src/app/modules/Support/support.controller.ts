import { Request, Response } from 'express';

import httpStatus from 'http-status';
import supportEmailWithNodemailer from '../../helpers/email';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const sentSupportMessage = catchAsync(async (req: Request, res: Response) => {
  console.log('contact us data ------+> ', req.body);
  const { name, email, message } = req.body;
  const emailData = {
    email: email,
    subject: `You have receive message from : ${name}`,
    html: `
      <div style="background-color: #ffffff; color:#FAFAFA; font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #F97316; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.ibb.co.com/kMZDrfZ/logo.png" alt="Sara sns woof" style="max-width: 100%; height: auto;" />
        </div>
                <p style="font-size: 16px; line-height: 1.5; color: #000000;">
          You have receive message from <a href="mailto:${email}" style="color: #F97316; text-decoration: none;">${name}</a>.
        </p>
        <h2 style="color: #F97316; text-align: center;">Hello, Sara sns woof!</h2>
        <p style="font-size: 16px; line-height: 1.5; color: #000000;">
         ${message}
        </p>


        <hr style="border-top: 1px solid #F97316; background-color: #F97316; color: #F97316;" />
        <p style="font-size: 14px; line-height: 1.5; color: #000000;">
          Best Regards,<br/>
           <span style="color: #F97316;">${name}</span>
        </p>
        <p style="font-size: 12px; color: #F9731688; text-align: center;">
          You are receiving this email because ${name} contacted you via our platform. 
        </p>
      </div>
    `,
  };

  await supportEmailWithNodemailer(emailData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your message sent successfully',
    data: '',
  });
});

export default sentSupportMessage;
