import { Request, Response } from 'express';

export function zidAuthRedirect(req: Request, res: Response) {
  const queries = new URLSearchParams({
    client_id: process.env.ZID_CLIENT_ID,
    redirect_uri: `${process.env.MY_BACKEND_URL}/zid/auth/callback`,
    response_type: 'code'
  });
  
  const authUrl = `${process.env.ZID_AUTH_URL}/oauth/authorize?${queries}`;
  res.redirect(authUrl);
}

export default zidAuthRedirect;
  // export const zidAuthRedirect = (req, res, next) => {
//     try {
//         const queries = new URLSearchParams({
//             client_id: process.env.ZID_CLIENT_ID,
//             redirect_uri: `${process.env.MY_BACKEND_URL}/zid/auth/callback`,
//             response_type: 'code',
//         });

//         const authUrl = `${process.env.ZID_AUTH_URL}/oauth/authorize?${queries}`;

//         console.log('Zid Auth Redirect - Environment variables:');
//         console.log('ZID_CLIENT_ID:', process.env.ZID_CLIENT_ID);
//         console.log('MY_BACKEND_URL:', process.env.MY_BACKEND_URL);
//         console.log('ZID_AUTH_URL:', process.env.ZID_AUTH_URL);
//         console.log('Constructed Auth URL:', authUrl);

//         return res.redirect(authUrl);
//     } catch (error) {
//         console.error('Error in zidAuthRedirect:', error);
//         return res.status(500).json({ error: 'Internal server error during redirect', details: error.message });
//     }
// };

