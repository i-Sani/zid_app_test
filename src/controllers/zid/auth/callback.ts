import { Request, Response, NextFunction } from "express";
import { ZidApiService } from '../../../services/zid-service';
export const zidAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const code = req.query.code as string | undefined;  // Ensure code is properly typed
        
        if (!code) {
            console.error('No authorization code received in callback');
            return res.status(400).json({ error: 'No authorization code received' });
        }
        
        console.log('Attempting to get tokens with code:', code);
        const merchantTokens = await ZidApiService.getTokensByCode(code);
        
        // Check if tokens were received properly
        const { access_token, authorization, refresh_token } = merchantTokens;  // Ensure proper case
        
        // Logging tokens for debugging
        console.log('Access Token (X-MANAGER-TOKEN):', access_token);
        console.log('Authorization Token:', authorization);
        console.log('Refresh Token:', refresh_token);

        // Securely store tokens (logic to be implemented as per your architecture)
        // For example: storing tokens in session or database
        
        console.log('Tokens successfully retrieved and processed');
        
        // Send a success response
        return res.status(200).json({ message: 'Authentication successful', tokens: { access_token, authorization, refresh_token } });
    } catch (error) {
        console.error('Error in zidAuthCallback:', error);
        return res.status(500).json({ error: 'Internal server error during callback', details: error instanceof Error ? error.message : String(error) });
    }
};
