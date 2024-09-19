// @ts-nocheck
import {ZidApiService} from "../../../services/zid-service";
export const zidAuthCallback = async (req, res) => {
    try {
      const zidCode = req.query.code;
      
      // Retrieve merchant tokens
      const merchantTokens = await ZidApiService.getTokensByCode(zidCode);
      
      // Check if the response contains an error
      if (merchantTokens.status === 'error') {
        console.error('Error in token response:', merchantTokens.message);
        return res.status(400).json({ error: 'Failed to obtain access token' });
      }
  
      // Now we can safely access the token properties
      const managerToken = merchantTokens.access_token;
      const authToken = merchantTokens.authorization;
      const refreshToken = merchantTokens.refresh_token;
  
      if (!managerToken || !authToken || !refreshToken) {
        console.error('Missing required tokens in response');
        return res.status(400).json({ error: 'Incomplete token information received' });
      }
  
      // Rest of your code...
      let user = await UserService.getUserByZidToken(managerToken);
      
      if (!user) {
        const zidMerchantDetails = await ZidApiService.getMerchantProfile(managerToken, authToken);
        user = await UserService.createUserFromZidDetails(zidMerchantDetails, managerToken, authToken, refreshToken);
      } else {
        await UserService.updateUserTokens(user.id, managerToken, authToken, refreshToken);
      }
  
      // Set session or JWT token here if you're using session-based or token-based authentication
      
      // Redirect the user to your application dashboard.
      return res.redirect(process.env.DASHBOARD_URL);
    } catch (error) {
      console.error('Error in Zid auth callback:', error);
      return res.status(500).json({ error: 'Authentication failed' });
    }
  };
  