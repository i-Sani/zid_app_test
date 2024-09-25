// @ts-nocheck
import { ZidApiService } from "../../../services/zid-service";

export const zidAuthCallback = async (req, res) => {
    // Zid will redirect the user to your application again and send you `code` in the query parameters
    const zidCode = req.query.code;

    // Validate if the authorization code exists
    if (!zidCode) {
        return res.status(400).send('Authorization code is missing.');
    }

    try {
        // Fetch merchant tokens using the authorization code
        const merchantTokens = await ZidApiService.getTokensByCode(zidCode);

        // Validate if the tokens were successfully retrieved
        if (!merchantTokens || !merchantTokens.access_token || !merchantTokens.authorization) {
            return res.status(500).send('Failed to retrieve tokens from Zid.');
        }

        // Extract the tokens from the response
        const managerToken = merchantTokens.access_token;
        const authToken = merchantTokens.authorization;
        const refreshToken = merchantTokens.refresh_token;

        // Check if the user already exists in the database
        // let user = await UsersService.getUserByZidToken(managerToken);
        if (!user) {
            // Retrieve merchant profile using the tokens
            const zidMerchantDetails = await ZidApiService.getMerchantProfile(managerToken, authToken);
            // Create user from zid merchant details response (add your logic here)
        }

        // OAuth flow has finished, continue with your own logic
        // Redirect the user to your application dashboard
        return res.redirect('Your Dashboard URL');
    } catch (error) {
        // Log the error for debugging
        console.error("Error in Zid Auth Callback:", error);
        return res.status(500).send('Internal server error.');
    }
};




// import { Request, Response, NextFunction } from 'express';
// const ZidApiService = require('../../../services/zid-service');

// export const zidAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log(req.body)
//     const code = req.query.code as string | undefined;
    
    
//     if (!code) {
//       console.error('No code received in callback');
//       return res.status(400).json({ error: 'No authorization code received' });
//     }
    
//     console.log('Attempting to get tokens with code:', code);
//     const merchantTokens = await ZidApiService.getTokensByCode(code);
    
//     // Process the tokens
//     const { access_token, authorization, refresh_token } = merchantTokens;
    
//     // Here, implement your logic to securely store these tokens
//     // For example, you might want to use a secure storage service or database
//     console.log('Access Token:', access_token);
//     console.log('Authorization:', authorization);
//     console.log('Refresh Token:', refresh_token);

//     // You might want to associate these tokens with a user session or account
//     // This depends on your application's architecture

//     console.log('Tokens successfully retrieved and processed');

//     // Send a success response
//     // The actual redirection should be handled on the client side
//     return res.status(200).json({ message: 'Authentication successful' });
//   } catch (error) {
//     console.error('Error in zidAuthCallback:', error);
//     return res.status(500).json({ error: 'Internal server error during callback', details: (error instanceof Error ? error.message : String(error)) });
//   }
// //  return res.status(200).json({ message: 'url active' });

// };

// @ts-nocheck
// import {ZidApiService} from "../../../services/zid-service";
// export const zidAuthCallback = async (req, res) => {
//     try {
//         console.log('Received callback with query:', req.query);
//         const zidCode = req.query.code;
        
//         if (!zidCode) {
//             console.error('No code received in callback');
//             return res.status(400).json({ error: 'No authorization code received' });
//         }
        
//         console.log('Attempting to get tokens with code:', zidCode);
//         const merchantTokens = await ZidApiService.getTokensByCode(zidCode);
        
//         console.log('Received tokens:', JSON.stringify(merchantTokens, null, 2));
        
//         // Check if the response contains an error
//         if (merchantTokens.status === 'error') {
//             console.error('Error in token response:', merchantTokens.message);
//             return res.status(400).json({ error: 'Failed to obtain access token' });
//         }

//         // Now we can safely access the token properties
//         const managerToken = merchantTokens.access_token;
//         const authToken = merchantTokens.authorization;
//         const refreshToken = merchantTokens.refresh_token;

//         if (!managerToken || !authToken || !refreshToken) {
//             console.error('Missing required tokens in response');
//             return res.status(400).json({ error: 'Incomplete token information received' });
//         }

//         console.log('Successfully retrieved all required tokens');

//         // Rest of your code...
//         let user = await UserService.getUserByZidToken(managerToken);
        
//         if (!user) {
//             console.log('No existing user found, creating new user');
//             const zidMerchantDetails = await ZidApiService.getMerchantProfile(managerToken, authToken);
//             user = await UserService.createUserFromZidDetails(zidMerchantDetails, managerToken, authToken, refreshToken);
//             console.log('New user created:', user.id);
//         } else {
//             console.log('Existing user found, updating tokens');
//             await UserService.updateUserTokens(user.id, managerToken, authToken, refreshToken);
//             console.log('User tokens updated for user:', user.id);
//         }

//         // Set session or JWT token here if you're using session-based or token-based authentication
//         // For example:
//         // req.session.userId = user.id;
        
//         console.log('Redirecting to dashboard');
//         // Redirect the user to your application dashboard.
//         return res.redirect(process.env.DASHBOARD_URL);
//     } catch (error) {
//         console.error('Error in Zid auth callback:', error);
//         return res.status(500).json({ error: 'Authentication failed', details: error.message });
//     }
// };