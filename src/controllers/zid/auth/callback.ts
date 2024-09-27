import { Request, Response, NextFunction } from 'express';
// const ZidApiService = require('../../../services/zid-service');
import { ZidApiService } from '../../../services/zid-service';  // Ensure correct path

export const zidAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const code = req.query.code as string | undefined;
    
    if (!code) {
      console.error('No code received in callback');
      return res.status(400).json({ error: 'No authorization code received' });
    }
    
    console.log('Attempting to get tokens with code:', code);
    const merchantTokens = await ZidApiService.getTokensByCode(code);
    
    // Process the tokens
    const { access_token, authorization, refresh_token } = merchantTokens;
    
    // Here, implement your logic to securely store these tokens
    // For example, you might want to use a secure storage service or database
    console.log('Access Token:', access_token);
    console.log('Authorization:', authorization);
    console.log('Refresh Token:', refresh_token);

    // You might want to associate these tokens with a user session or account
    // This depends on your application's architecture

    console.log('Tokens successfully retrieved and processed');

    // Send a success response
    // The actual redirection should be handled on the client side
    return res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    console.error('Error in zidAuthCallback:', error);
    return res.status(500).json({ error: 'Internal server error during callback', details: (error instanceof Error ? error.message : String(error)) });
  }
};
